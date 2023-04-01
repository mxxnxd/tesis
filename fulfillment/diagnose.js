const util = require('./utility.js');
const db = require('../firebase/database.js');
const rule = require('../rules/rules-engine.js');

/*
	Webhook Functions: Medical Impression Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */

/* ========== ========== ========== ========== ========== ========== ========== */

const en_start_diagnose = async (agent) => {
	util.triggerEvent(agent, 'EN-THANKS');
};

const en_give_diagnose = async (agent) => {
	const senderID = util.getSenderID(agent);

	var user = await db.getUser(senderID);
	var diseaseRules = await db.getDisease();
	var fact = {user: user, agent: {next_action: ''}, rules: diseaseRules};

	// Get Determined Disease
	const res = await rule.getAction(fact);
	var responses;

	if (res.agent.next_action.includes('EN-DIAGNOSE-')) {
		switch (res.agent.next_action) {
			case 'CORONARY_ARTERY_DISEASE':
				responses = await db.getDiseaseResponse('cad');
				break;
			default: responses = await db.getDiseaseResponse(res.agent.next_action.toLowerCase().split('-')[2]);
		}
	}

	agent.add(responses['ans_impression']);
};

module.exports = {
	en_start_diagnose,
	en_give_diagnose
};