/*
	Utility functions for repetetive codes.
*/

/*
	Utility function for setting multiple contexts.
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
	Utility function for obtaining Facebook user ID
*/
const getSenderID = (agent) => {
	return agent.request_.body.originalDetectIntentRequest.payload.data.sender.id;
};

module.exports = {
	setContexts,
	triggerEvent,
	getSenderID
};