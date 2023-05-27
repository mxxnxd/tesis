/*
	Description: 	Functions for managing and processing intents through the Google Dialogflow API.
	Author: 		Steven Castro
	Remarks: 		Intent Manager V2
*/

// Libraries

// Excel Loader
const xlsx = require('xlsx');
const filePath = './intent-definition.xlsx';

// JSON to Proto Converter
const sjson = require('./structjson');

// Google API
const { IntentsClient } = require('@google-cloud/dialogflow').v2;
require('dotenv').config({path: '../.env'});
require('dotenv').config();

// Google API Setup
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const PROJECTID = CREDENTIALS.project_id;
const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS['private_key'],
		client_email: CREDENTIALS['client_email']	
	}
}

// Intent Client (Used for create, view, delete operations on intents)
const intentClient = new IntentsClient(CONFIGURATION);

/*
	Load Intent Information from Excel Spreadsheet
*/
const loadIntentExcel = () => {
	var workbook = xlsx.readFile(filePath);
	var sheetNameList = workbook.SheetNames;
	var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
	return data;
};

/*
	Utility function formatting intent data according to Google REST API
*/
const formatIntent = (json) => {
	var agentIntentName;
	var agentTrainingPhrases = [];
	var agentResponsePhrases = [];
	var agentInputContexts = [];
	var agentOutputContexts = [];
	var agentParameters = [];
	var agentEvents = [];
	var agentWebhookEnabled = (json.webhook_enabled == 1) ? 'WEBHOOK_STATE_ENABLED' : 'WEBHOOK_STATE_UNSPECIFIED';

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Intent Name
	if (json.intent_name) {
		agentIntentName = json.intent_name;
	} else {
		return console.log('An error has occured, missing intent name!');
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Parameters
	if (json.parameters) {
		const parameters = json.parameters.replace(/\s/g, "").split(',');
		parameters.forEach(parameter => {
			const parameterData = (parameter.includes('.')) ?  (parameter.split('.')) : (parameter.split('-'));
			const part = {
				displayName: parameterData[1],
				mandatory: true,
				entityTypeDisplayName: `@${parameter}`,
				prompts: json.prompts.split(',')		
			};
			agentParameters.push(part);
		});
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Training Phrases
	if (json.training_phrases) {
		const trainingPhrases = json.training_phrases.split(',');
		trainingPhrases.forEach(phrase => {
			const part = {
				text: phrase,
			};
			const trainingPhrase = {
				type: 'EXAMPLE',
				parts: [part]
			};
			agentTrainingPhrases.push(trainingPhrase);
		});
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Entity Phrases
	if (json.entity_phrases) {
		const entityPhrases = json.entity_phrases.split('*');
		entityPhrases.forEach(entityPhrase => {
	   	    var trainingPhrase = {
            	type: 'EXAMPLE',
            	parts: []
        	}; 	
        	const phraseParts = entityPhrase.split('/');
        	phraseParts.forEach(phrasePart => {
        		// Check if the current phrase is an entity
        		if (phrasePart[0] === '@') {
        			var parameter = phrasePart.substring(1);
        			var entityParts = parameter.split(':');
        			var aliases = (entityParts[1].includes('.')) ? (entityParts[1].split('.')) : (entityParts[1].split('-'));

        			const part = {
        				text: entityParts[0],
        				entityType: `@${entityParts[1]}`,
        				alias: aliases[1],
        				userDefined: true
        			};
        			trainingPhrase.parts.push(part);
        		} else {
        			const part = {
        				text: phrasePart
        			};
        			trainingPhrase.parts.push(part);
        		}	
        	});
        	agentTrainingPhrases.push(trainingPhrase);		
		});
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Responses
	if (json.trained_responses) {
		const part = {
			text: json.trained_responses.split('^')
		};
		const responsePhrase = {
			platform: 'FACEBOOK',
			text: part
		};
		agentResponsePhrases.push(responsePhrase);
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

    // Quick replies
	if (json.quick_replies) {
		const quickReplies = json.quick_replies.split(',');
		const proto = sjson.jsonToStructProto(buildQuickReplyPayload(quickReplies));
		const quickReplyResponse = {
			platform: 'FACEBOOK',
			payload: proto
		};
		agentResponsePhrases.push(quickReplyResponse);
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Input Context
	if (json.input_context) {
		const inputContexts = json.input_context.replace(/\s/g, "").split(',');
		inputContexts.forEach(inputContext => {
			agentInputContexts.push(intentClient.projectAgentSessionContextPath(PROJECTID, 'sjc', inputContext));
		});
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Output Context
	if (json.output_context) {
		const outputContexts = json.output_context.replace(/\s/g, "").split(',');
		outputContexts.forEach(outputContext => {
			const outputContextData = outputContext.split(':');
			const part = {
				name: intentClient.projectAgentSessionContextPath(PROJECTID, 'sjc', outputContextData[0]),
				lifespanCount: parseInt(outputContextData[1])
			};
			agentOutputContexts.push(part);
		});
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Events
	if (json.events) {
		const events = json.events.replace(/\s/g, "").split(',');
		events.forEach(event => {
			agentEvents.push(event);
		});
	}

	/* ===== ===== ===== ===== ===== ===== ===== */

	// Formatted intent JSON
    const formattedJSON = {
    	defaultResponsePlatforms: ['FACEBOOK'],
    	displayName: agentIntentName,
    	trainingPhrases: agentTrainingPhrases,
    	messages: agentResponsePhrases,
    	inputContextNames: agentInputContexts,
    	outputContexts: agentOutputContexts,
    	webhookState: agentWebhookEnabled,
    	parameters: agentParameters,
    	events: agentEvents
    }
	return formattedJSON;
};

/*
	Creates an intent on the DialogFlow API
*/
const callCreateIntent = async (json) => {
	var agentPath = intentClient.projectAgentPath(PROJECTID);

	var req = {
		parent: agentPath,
		intent: formatIntent(json)
	};

	var [res] = await intentClient.createIntent(req);
	console.log(`Created Intent: ${res.displayName}`);
};

/*
	Deletes an intent on the DialogFlow API based on intent name
*/
const callDeleteIntent = async (intent) => {
	var inputName = intent.intent_name;
	var intentID = await getIntentID(inputName);

	if (intentID) {
		var req = {
			name: intentID
		};
		var res = await intentClient.deleteIntent(req);
		console.log(`Deleted Intent: ${inputName}`);
	}
};

/*
	List intents present on the DialogFlow API
*/
const callListIntent = async () => {
	var agentPath = intentClient.projectAgentPath(PROJECTID);

	var req = {
		parent: agentPath
	}

	var [res] = await intentClient.listIntents(req);

	res.forEach(intent => {
		console.log(intent);
		console.log(intent.name);
		console.log(intent.displayName);
	});
}

/*
	Utility function for retrieving intent ID based on intent name
*/
const getIntentID = async (inputName) => {
	var agentPath = intentClient.projectAgentPath(PROJECTID);

	var req = {
		parent: agentPath
	}

	var [res] = await intentClient.listIntents(req);
	var intentID = [];

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
                payload: quickReply
            }
            payload.facebook.quick_replies.push(part);
        }
    });
    return payload;
};

module.exports = {
	loadIntentExcel,
	callCreateIntent,
	callDeleteIntent,
	callListIntent
};

const main = async () => {
	const data = loadIntentExcel();
	await callDeleteIntent(data[0]);
	await callCreateIntent(data[0]);;
};

// main();