const util = require('./utility.js');
const db = require('../firebase/database.js');

/*
	Webhook Functions: Language Selection Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */

var userLangMap = new Map();

/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_language = async (agent) => {
	const senderID = util.getSenderID(agent);
	userLangMap.set(senderID, agent.parameters.language); 

	agent.add(`Great! I see your selected language is ${agent.parameters.language} am I correct?`);
};

const en_get_language_yes = async (agent) => {
	const senderID = util.getSenderID(agent);
	console.log(`USER: ${senderID} LANG: ${userLangMap.get(senderID)}`);

	db.createUser(senderID, {
		language: userLangMap.get(senderID)
	});

	util.setContexts(agent, ['CX-CFM-LANG'], [0]);

	if (userLangMap.get(senderID) === 'ENGLISH') {
		util.triggerEvent(agent, 'EN-ASK-TERMS');
	} else {
		util.triggerEvent(agent, 'FI-ASK-TERMS');
	}

	userLangMap.delete(senderID);
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