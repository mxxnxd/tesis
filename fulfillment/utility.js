// Libraries
const { Payload } = require('dialogflow-fulfillment');
const extract_symptom = JSON.parse(require('fs').readFileSync('./fulfillment/extract/extract-symptom.json', 'utf8'));

/*
	Utility function for setting multiple contexts & lifespan.
*/
function setContexts(agent, contexts, lifespan) {
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
function triggerEvent(agent, name) {
	agent.add('.');
	agent.setFollowupEvent(name);
};

/*	
	Utility function for obtaining Facebook user sender ID
*/
function getSenderID(agent) {
	return agent.request_.body.session.split('/')[4];
	// return agent.request_.body.originalDetectIntentRequest.payload.data.sender.id;
};

/*	
	Utility function for obtaining Message Sentiment Score
*/
function getSentimentScore(agent){
	return agent.alternativeQueryResults[0].sentimentAnalysisResult.queryTextSentiment.score;
}

/*	
	Utility function for obtaining Message Language code
*/
function getLanguageCode(agent) {
	return agent.request_.body.queryResult.languageCode;
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
function buildQuickReplyPayload(agent, message, inputQuickReplies) {
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
	var payload = new Payload(agent.FACEBOOK, response);
	payload.sendAsMessage = true;
	return payload;
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

/*
    Utility function for building symptoms extracted from entities
*/
function extractSymptomFromKeywords(body_subject, body_condition) {
	// Fetch Subject
	const extracted_subject = extract_symptom[body_subject];

	// Fetch Symptom
	if (extracted_subject) {
		const extracted_symptom = extracted_subject[body_condition];
		if (extracted_symptom) {
			return extracted_symptom;
		}
	}

	return null;
};

module.exports = {
	setContexts,
	triggerEvent,
	getSenderID,
	getSentimentScore,
	buildQuickReplyPayload,
	getEventToKey,
	respond,
	extractSymptomFromKeywords,
	getLanguageCode
};