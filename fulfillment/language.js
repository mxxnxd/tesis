const util = require('./utility.js');

/*
	Webhook Functions: Language Selection Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */

let SELECTED_LANGUAGE = 'ENGLISH';

/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_language = async (agent) => {
	SELECTED_LANGUAGE = agent.parameters.language;
	agent.add(`Great! I see your selected language is ${agent.parameters.language} am I correct?`);
};

const en_get_language_yes = async (agent) => {
	console.log(`LANG: ${SELECTED_LANGUAGE}`);

	// TODO: KNOWLEDGE BASE LOGIC

	util.setContexts(agent, ['CX-CFM-LANG'], [0]);

	if (SELECTED_LANGUAGE === 'ENGLISH') {
		util.triggerEvent(agent, 'EN-ASK-TERMS');
	} else {
		util.triggerEvent(agent, 'FI-ASK-TERMS');
	}
};

const en_get_language_no = async (agent) => {	
	util.triggerEvent(agent, 'EN-ASK-LANGUAGE-RETRY');
};

const fi_get_language = async (agent) => {

};

const fi_get_language_yes = async (agent) => {

};

const fi_get_language_no = async (agent) => {

};

module.exports = {
	en_get_language,
	en_get_language_yes,
	en_get_language_no
};