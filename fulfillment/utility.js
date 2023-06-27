// Libraries
const { Payload } = require('dialogflow-fulfillment');

/*
	Utility function for setting multiple contexts & lifespan.
*/
const setContexts = (agent, contexts, lifespan) => {
	contexts.forEach((context, index) => {
		agent.context.set({
			name: context,
			lifespan: lifespan[index]
		});
	});
};

/*
	Utility function for triggering intents (Does not work if add() is not invoked).
*/
const triggerEvent = (agent, name) => {
	agent.add('.');
	agent.setFollowupEvent(name);
};

/*	
	Utility function for obtaining Facebook user sender ID
*/
const getSenderID = (agent) => {
	return agent.request_.body.originalDetectIntentRequest.payload.data.sender.id;
};

/*	
	Utility function for obtaining Message Sentiment Score
*/
const getSentimentScore = (agent) => {
	return agent.alternativeQueryResults[0].sentimentAnalysisResult.queryTextSentiment.score;
}

/*	
	Utility function for obtaining symptom key from event name
*/
const getEventToKey = (event) => {
	const strings = event.toLowerCase().split('-');
	return strings[2];
};

/*
    Utility function for building Custom Quick Replies Payload JSON
*/
const buildQuickReplyPayload = (agent, message, inputQuickReplies) => {
	const response = {
		platform: 'FACEBOOK',
		text: message,
		quick_replies: []
	};
	inputQuickReplies.forEach(quickReply => {
		var option = {
			content_type: 'text',
			title: quickReply,
			payload: quickReply
		};
		response.quick_replies.push(option);
	});

	// Build Payload
	var payload =	 new Payload(agent.FACEBOOK, response);
	payload.sendAsMessage = true;
	return payload;
};

/*
    Utility function for building symptoms extracted from entities (Pain, Tight, Swell)
*/
const getSymptomCondition = (bodyPart, bodyCondition) => {
	var symptom_name = `${bodyPart}_${bodyCondition}`.toUpperCase();
	var listedSymptoms = ['BELLY_PAIN', 'ARM_PAIN', 'BACK_PAIN', 'BONE_PAIN', 'CHEST_PAIN', 
						  'MOUTH_PAIN', 'MUSCLE_PAIN', 'NECK_PAIN', 'SHOULDER_PAIN', 'HEAD_PAIN',
						  'BELLY_SWELL', 'LEGS_SWELL', 'NECK_SWELL', 'NECK_TIGHT', 'CHEST_TIGHT'];

	if (listedSymptoms.includes(symptom_name)) {
		switch (symptom_name) {
			case 'HEAD_PAIN': 		return 'headaches';
			case 'BELLY_PAIN': 		return 'abdomen_pain';
			case 'NECK_PAIN':
			case 'SHOULDER_PAIN': 	return 'neck_shoulder_pain';
			default:				return symptom_name.toLowerCase();
		}
	}
	return null;
};

/*
    Utility function for multiline responses on Messenger
*/
function respond(agent, response, parameters) {
	// Select Message
	const messages = response[Math.floor(Math.random() * response.length)];

	// Replace Parameters
	if (parameters) {
		for (i = 0; i < parameters.length; i++) {
			for (j = 0; j < messages.length; j++) {
				messages[j] = messages[j].replace(parameters[i][0], parameters[i][1]);
			}
		}
	}

	// Send Message
	messages.forEach(message => {
		agent.add(message);
	});
};

module.exports = {
	setContexts,
	triggerEvent,
	getSenderID,
	getSentimentScore,
	buildQuickReplyPayload,
	getEventToKey,
	getSymptomCondition,
	respond
};