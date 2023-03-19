const util = require('./utility.js');
const rule = require('../rules/rules-engine.js');

/*
	Webhook Functions: Symptom Extraction Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_symptoms_yes = async (agent) => {

	agent.add("Webhook!");
};

const en_get_symptoms_no = async (agent) => {

	agent.add("Webhook!");
};

module.exports = {
	en_get_symptoms_yes,
	en_get_symptoms_no
};