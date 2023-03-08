const util = require('./utility.js');

/*
	Webhook Functions: Symptom Extraction Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const en_ = async (agent) => {

	console.log(agent.request_.body.originalDetectIntentRequest.payload.data);
	agent.add("Webhook!");
};

module.exports = {
	dv_webhook
};