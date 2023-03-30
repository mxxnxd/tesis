const util = require('./utility.js');

/*
	Webhook Functions: Test Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const dv_webhook = async (agent) => {

	console.log(agent.request_.body.originalDetectIntentRequest.payload.data);

	util.triggerEvent(agent, 'EN-DIAGNOSE-UNABLE_TO_DIAGNOSE');

	agent.add("Webhook!");
};

module.exports = {
	dv_webhook
};