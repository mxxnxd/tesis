// Packages
const {SessionsClient, IntentsClient} = require('@google-cloud/dialogflow').v2;
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

/*
	Creates an Intent on the DialogFlow API
	intent: 
*/
const callCreateIntent = async (intent) => {
	let agentPath = intentClient.projectAgentPath(PROJECTID);

	let req = {
		parent: agentPath,
		intent: intent
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
			console.log(intent.messages[1].payload)

			let temp = sjson.structProtoToJson(intent.messages[1].payload.fields.facebook.structValue);
			console.log(temp);

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
const buildIntent = (inputName, inputPhrases, inputResponses, inputQuickReplies) => {
	// Training Phrases
	let trainingPhrases = [];
	inputPhrases.forEach(phrase => {
		const part = {text: phrase}
		const trainingPhrase = {
			type: 'EXAMPLE',
			parts: [part]
		};
		trainingPhrases.push(trainingPhrase);
	});

	// Responses
	const part = {text: inputResponses};
	const trainedResponse = {
		platform: 'FACEBOOK',
		text: part,
	};

	// const part2 = buildQuickReplyPayload(inputQuickReplies);
	const part2 = sjson.jsonToStructProto(buildQuickReplyPayload(inputQuickReplies));

	const trainedResponse2 = {
		platform: 'FACEBOOK',
		payload: part2,
	};

	let trainedResponses = [trainedResponse, trainedResponse2];

	return builtIntent = {
		defaultResponsePlatforms: ['FACEBOOK'],
		displayName: inputName,
		trainingPhrases: trainingPhrases,
		messages: trainedResponses,
		webhookState: 'WEBHOOK_STATE_ENABLED'
	};

	// TODO Set Conditional for WEBHOOK STATE
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
		let part = {
			content_type: 'text',
			title: quickReply,
			payload: '<POSTBACK_PAYLOAD>'
		}
		payload.facebook.quick_replies.push(part);

	});

	return payload;
};

/*
	Main function
*/
const main = async () => {
	//callListIntent()
	//await callDeleteIntent('sample.create.test4');
	await callCreateIntent(buildIntent('sample.create.test5', ['Marco', 'marko', 'asdadasd', 'mako'], ['Polo'], ['A', 'B', 'C']));
	await getIntentID('sample.create.test4');
}

console.log("========== ========== ========== ========== ==========");
main();
