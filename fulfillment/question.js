const util = require('./utility.js');
const rule = require('../rules/rules-engine.js');
const db = require('../firebase/database.js');

/*
	Webhook Functions: Symptom Extraction Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */

var userSympMap = new Map();
var diseaseRules;

/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_question = async (agent) => {
	const senderID = util.getSenderID(agent)

	if (agent.parameters.disease !== '') {
		var responses = await db.getDiseaseResponse(agent.parameters.disease.toLowerCase());
		switch (agent.parameters.query_type) {
			case '':
			case 'COMMON':
				agent.add(responses['ask_common_symp']);
				break;
			case 'OTHER':
				agent.add(responses['ask_other_symp']);
				break;
			case 'SEVERE':
				agent.add(responses['ask_severe_symp']);
				break;
			case 'DEFINITION':
				agent.add(responses['ask_definition']);
				break;
		}	
		console.log(`USER: ${senderID} QUERY: ${agent.parameters.disease} TYPE: ${agent.parameters.query_type}`);

	} else {
		var responses = await db.getSymptomResponse(agent.parameters.symptom.toLowerCase());
		switch (agent.parameters.query_type) {
			case 'DEFINITION':
				agent.add(responses['ask_definition']);
				break;
		}	
		console.log(`USER: ${senderID} QUERY: ${agent.parameters.symptom} TYPE: ${agent.parameters.query_type}`);

	}	
};

module.exports = {
	en_get_question
};