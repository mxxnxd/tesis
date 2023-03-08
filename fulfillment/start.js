const util = require('./utility.js');

/*
	Webhook Functions: Starting Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const en_start_checkup = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC (DETERMINE NEW USER)

	if (true) {
		util.triggerEvent(agent, 'EN-ASK-LANGUAGE');

	} else {

		util.setContexts(agent, ['PH-CHECK', 'CX-GET-SYMP', 'CX-CFM-SYMP'], [3, 3]);


		// RULE ENGINE LOGIC

		// TRIGGER SOME EVENTS HERE BASED ON RULE ENGINE OUTPUT

		agent.add('Alright! Lets get to it then!');
		agent.add('Have you been feeling well?.');
	}
};

const en_start_question = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC (DETERMINE NEW USER)

	if (false) {
		util.triggerEvent(agent, 'EN-ASK-LANGUAGE');

	} else {
		util.triggerEvent(agent, 'EN-GET-QUESTION');

		// QUERY LOGIC

	}
};

module.exports = {
	en_start_checkup,
	en_start_question
};