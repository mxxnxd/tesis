const util = require('./utility.js');

/*
	Webhook Functions: Terms Acceptance Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_terms_yes = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC

	util.setContexts(agent, ['PH-INTRO', 'CX-CFM-TERM'], [0, 0]);
	agent.add('WOW');
};

const en_get_terms_no = async (agent) => {	
	util.setContexts(agent, ['CX-CFM-TERM'], [0]);
	util.triggerEvent(agent, 'EN-END-TERMS');
};

module.exports = {
	en_get_terms_yes,
	en_get_terms_no
};