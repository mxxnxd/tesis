const util = require('./utility.js');
const db = require('../firebase/database.js');

/*
	Webhook Functions: Language Selection Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

// Load Dialogue
const introduction_dialogue = JSON.parse(require('fs').readFileSync('./fulfillment/dialogue/introduction-dialogue.json', 'utf8'));

const default_user_profile = {
	user: {
		positive_symptoms: [],
		negative_symptoms: [],		 
		previous_symptoms: [],
		start: true,
		terms: false,
		language: false,
		recall: false,
	},
	agent: {
		next_action: false,
	}
};

async function enUserConfirmIntro(agent) {
	// Fetch Parameters
	const senderID = util.getSenderID(agent);
	const bool = agent.parameters.affirm;

	// Response
	if (bool === 'AFFIRM') {
		// Create User Profile
		db.createUser(senderID, default_user_profile);

		const response = introduction_dialogue.en_user_confirm_intro_yes
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-INTRODUCTION', 'CHOOSE-LANGUAGE'], [5, 0, 3]);
	} else {
		const response = introduction_dialogue.en_user_confirm_intro_no
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-INTRODUCTION'], [0, 0]);	
	}
};

async function enUserChooseLanguage(agent) {
	// Fetch Parameters
	const senderID = util.getSenderID(agent);
	const language = agent.parameters.language;

	// Update User Profile
	db.updateUser(senderID, {language: language});

	// Response
	const response = introduction_dialogue.en_user_choose_language;
	util.respond(agent, response, [['[LANGUAGE]', language]]);
	util.setContexts(agent, ['PHASE-INTRODUCTION', 'CHOOSE-LANGUAGE', 'CONFIRM-LANGUAGE'], [5, 0, 3]);
};

async function enUserConfirmLanguage(agent) {
	// Fetch Parameters
	const senderID = util.getSenderID(agent);
	const bool = agent.parameters.affirm;

	// Response
	if (bool === 'AFFIRM') {
		const response = introduction_dialogue.en_user_confirm_language_yes;
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-TERMS', 'CONFIRM-LANGUAGE'], [5, 3, 0]);

	} else {
		const response = introduction_dialogue.en_user_confirm_language_no;
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CHOOSE-LANGUAGE', 'CONFIRM-LANGUAGE'], [5, 3, 0]);
	}
};

async function enUserConfirmTerms(agent) {
	// Fetch Parameters
	const senderID = util.getSenderID(agent);
	const bool = agent.parameters.affirm;

	// Response
	if (bool === 'AFFIRM') {
		// Fetch Agent
		const agent_data = await db.getAgent(senderID);

		if (agent_data.command === 'CHECKUP') {
			const response = introduction_dialogue.en_user_start_checkup_term_accepted;
			util.respond(agent, response);
		} else {
			const response = introduction_dialogue.en_user_start_query_term_accepted;
			util.respond(agent, response);
		}
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-TERMS', 'PHASE-ELICITATION'], [0, 0, 5]);
	} else {
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-TERMS'], [0, 0]);
	}
};

module.exports = {
	enUserConfirmIntro,
	enUserChooseLanguage,
	enUserConfirmLanguage,
	enUserConfirmTerms
};
