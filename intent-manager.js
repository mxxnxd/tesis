// Packages
const {IntentsClient} = require('@google-cloud/dialogflow').v2;
const fs = require('fs'); 
const csv = require('csv-parser');
const sjson = require('./structjson');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const PROJECTID = CREDENTIALS.project_id;
const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS['private_key'],
		client_email: CREDENTIALS['client_email']	
	}
}

const intentClient = new IntentsClient(CONFIGURATION);
const filepath = 'intent-definition.csv';

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== */

/*
    Reads the CSV file containg Intent definition and formats it into JSON
*/
const loadIntentCSV = () => {
    const jsons = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath).on('error', (error) => {
            reject(error);
        }).pipe(csv()).on('data', (row) => {
            try {
                let intent = {
                    intent_name: row.intent_name,
                    training_phrases: row.training_phrases,
                    trained_responses: row.trained_responses,
                    quick_replies: row.quick_replies,
                    input_context: row.input_context,
                    output_context: row.output_context,
                    webhook_enabled: row.webhook_enabled
                };
                jsons.push(formatJSON(intent));
            }
            catch(err) {
                console.log(err);
                console.log("An error occured!");
            }   
        }).on('end', () => {
            resolve(jsons);
        });
    });
};

/*
	Creates an Intent on the DialogFlow API
	intent: 
*/
const callCreateIntent = async (json) => {
	let agentPath = intentClient.projectAgentPath(PROJECTID);

	let req = {
		parent: agentPath,
		intent: buildIntent(json)
	};

	let [res] = await intentClient.createIntent(req);
	console.log(`Created Intent: ${res.displayName}`);
};

/*
	Deletes an Intent on the DialogFlow API based on the Intent name
*/
const callDeleteIntent = async (inputName) => {
	let intentID = await getIntentID(inputName);

	if (intentID) {
		let req = {
			name: intentID
		};
		let res = await intentClient.deleteIntent(req);
		console.log(`Deleted Intent: ${inputName}`);
	}
};

/*
	List Intents present on the DialogFlow API
*/
const callListIntent = async () => {
	let agentPath = intentClient.projectAgentPath(PROJECTID);

	let req = {
		parent: agentPath
	}

	let [res] = await intentClient.listIntents(req);

	res.forEach(intent => {
		console.log(intent);
		console.log(intent.name);
		console.log(intent.displayName);
	});
}

/*
	Utility function for retrieving Intent ID based ono Intent Name
*/
const getIntentID = async (inputName) => {
	let agentPath = intentClient.projectAgentPath(PROJECTID);

	let req = {
		parent: agentPath
	}

	let [res] = await intentClient.listIntents(req);
	let intentID = [];

	res.every(intent => {
		if (inputName === intent.displayName) {
			intentID.push(intent.name);
			return false;
		} else {
			return true;
		}
	});
	return intentID[0];
}

/*
	Utility function for building Intent JSON
*/
const buildIntent = (json) => {	
	return builtIntent = {
		defaultResponsePlatforms: ['FACEBOOK'],
		displayName: json.intent_name,
		trainingPhrases: json.training_phrases,
		messages: json.trained_responses,
		webhookState: json.webhook_enabled,
		inputContextNames: json.input_contexts,
		outputContexts: json.output_contexts
	}
};


/*
    Utility function for building Custom Quick Replies Payload JSON
*/
const buildQuickReplyPayload = (inputQuickReplies) => {
    let payload = {
        facebook: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic"
                }
            },
            quick_replies: []
        }
    }

    // Quick Replies
    inputQuickReplies.forEach(quickReply => {
        if (quickReply.length > 0) {
            let part = {
                content_type: 'text',
                title: quickReply,
                payload: '<POSTBACK_PAYLOAD>'
            }
            payload.facebook.quick_replies.push(part);
        }
    });
    return payload;
};

/*
    Utility function formatting data according to Google REST API
*/
const formatJSON = (json) => {
    let trainingPhrases = [];
    let trainedResponses = [];
    let trainedInputContexts = []
    let trainedOutputContexts = []

    // Training Phrases
    json.training_phrases = json.training_phrases.replace(/\s/g, "").split(',');    
    json.training_phrases.forEach(phrase => {
        const part = {text: phrase}
        const trainingPhrase = {
            type: 'EXAMPLE',
            parts: [part]
        };
        trainingPhrases.push(trainingPhrase);
    });

    // Trained Responses
    const part = {text: json.trained_responses.replace(/\s/g, "").split(',')};
    const trainedResponse = {
        platform: 'FACEBOOK',
        text: part
    };
    trainedResponses.push(trainedResponse);

    // Quick replies
    json.quick_replies = json.quick_replies.replace(/\s/g, "").split(',');
    if (json.quick_replies[0].length > 0) {
        const part2 = sjson.jsonToStructProto(buildQuickReplyPayload(json.quick_replies));
        const trainedResponse2 = {
            platform: 'FACEBOOK',
            payload: part2
        };
        trainedResponses.push(trainedResponse2);
    }

    // Input Context
    json.input_context = json.input_context.replace(/\s/g, "").split(',');
    json.input_context.forEach(context => {
        if (context.length > 0) {
            trainedInputContexts.push(intentClient.projectAgentSessionContextPath(PROJECTID, 'scc', context));
        }
    });

    // Output Context
    json.output_context = json.output_context.replace(/\s/g, "").split(',');
	json.output_context.forEach(context => {
		if (context.length > 0) {
			let temp = context.split(':');
			const part = {
				name: intentClient.projectAgentSessionContextPath(PROJECTID, 'testsession', temp[0]),
				lifespanCount: parseInt(temp[1])
			};
			trainedOutputContexts.push(part);
		}
	});

	// Webhook Enabled
	let webhookEnabled = (parseInt(json.webhook_enabled) == 1) ? 'WEBHOOK_STATE_ENABLED' : 'WEBHOOK_STATE_UNSPECIFIED';

    let formatJSON = {
    	intent_name: json.intent_name,
    	training_phrases: trainingPhrases,
    	trained_responses: trainedResponses,
    	input_contexts: trainedInputContexts,
    	output_contexts: trainedOutputContexts,
    	webhook_enabled: webhookEnabled
    }
    return formatJSON;
};

module.exports = {
	loadIntentCSV,
	callCreateIntent,
	callDeleteIntent,
	callListIntent
}

// json.training_phrases = json.training_phrases.replace(/\s/g, "").split(',');
// json.trained_responses = json.trained_responses.replace(/\s/g, "").split(',');
// json.quick_replies = json.quick_replies.replace(/\s/g, "").split(',');
// json.input_context = json.input_context.replace(/\s/g, "").split(',');
// json.output_context = json.output_context.replace(/\s/g, "").split(',');