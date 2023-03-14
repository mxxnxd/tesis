const util = require('./utility.js');

/*
	Webhook Functions: Terms Acceptance Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_terms_yes = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC

	util.setContexts(agent, ['PH-INTRO', 'CX-CFM-TERM'], [0, 0]);
	util.triggerEvent(agent, 'EN-GREET-NEW');
};

const en_get_terms_no = async (agent) => {	
	util.setContexts(agent, ['CX-CFM-TERM'], [0]);
	util.triggerEvent(agent, 'EN-END-TERMS');
};

const fi_get_terms_yes = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC

	util.setContexts(agent, ['PH-INTRO', 'CX-CFM-TERM'], [0, 0]);
	console.log('end');
	//util.triggerEvent(agent, 'FI-GREET-NEW'); // TO ADD
};

const fi_get_terms_no = async (agent) => {
	util.setContexts(agent, ['CX-CFM-TERM'], [0]);
	//util.triggerEvent(agent, 'FI-END-TERMS'); // TO ADD
};

module.exports = {
	en_get_terms_yes,
	en_get_terms_no
};