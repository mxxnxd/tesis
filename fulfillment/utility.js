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

module.exports = {
	setContexts,
	triggerEvent,
	getSenderID,
	buildQuickReplyPayload,
	getEventToKey
};