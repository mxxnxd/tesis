const util = require('./utility.js');
const { Payload } = require('dialogflow-fulfillment');

/*
	Webhook Functions: Test Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const dvWebhook = async (agent) => {
	// console.log(agent.request_.body.originalDetectIntentRequest.payload.data);
	// util.triggerEvent(agent, 'EN-DIAGNOSE-COPD');
	// console.log(agent.parameters);

	agent.add("WEB");
	agent.add('HOOK');

	console.log(new Payload('FACEBOOK', util.buildQuickReplyPayload('What language do you prefer that I use?', ['English', 'Filipino'])));

	var payload = new Payload(agent.FACEBOOK, util.buildQuickReplyPayload('What language do you prefer that I use?', ['English', 'Filipino']));
	payload.sendAsMessage = true;
	agent.add(payload);
};

module.exports = {
	dvWebhook
};