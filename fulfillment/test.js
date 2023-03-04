const util = require('./utility.js');

/*
	Webhook Functions: Test Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const dv_webhook = async (agent) => {

	console.log(agent.request_.body.originalDetectIntentRequest.payload.data);
	agent.add("Webhook!");
};

module.exports = {
	dv_webhook
};