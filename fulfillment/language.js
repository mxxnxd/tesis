const util = require('./utility.js');
const db = require('../firebase/database.js');
const { delUserState, getUserState, setUserState } = require('../firebase/state.js');

/*
	Webhook Functions: Language Selection Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const default_user = {
	user: {
		positive_symptoms: [],
		negative_symptoms: [],
		start: true,
		terms: false,
		language: false,
	},
	agent: {
		next_action: false,
	},
}

const enConfirmIntroStart = async (agent) => {
	const senderID = util.getSenderID(agent);
	const bool = agent.parameters.affirm;

	// Create User
	db.createUser(senderID, default_user);

	if (bool === 'AFFIRM') {
		// Response
		agent.add(`Alright! Let's start of with the first question.`)
		agent.add(util.buildQuickReplyPayload(agent, 'What language do you prefer I use?', ['English', 'Filipino']));

		// Context
		util.setContexts(agent, ['PHASE-INTRO', 'START-INTRO', 'CHOOSE-LANG'], [5, 0, 3]);
	} else {
		// Response
		agent.add(`Aww :< I needed you to acknowledge my terms & conditions to use my features.`);
		agent.add('If you ever change your mind, talk to me again :>');

		// Context
		util.setContexts(agent, ['PHASE-INTRO', 'START-INTRO'], [0, 0]);
	}
};

const enChooseLanguage = async (agent) => {
	const senderID = util.getSenderID(agent);
	const language = agent.parameters.language;

	// Update User
	db.updateUser(senderID, {language: language});

	// Response
	agent.add('Great!');
	agent.add(`I see your selected language is ${language}, can I confirm?`);

	// Context
	util.setContexts(agent, ['PHASE-INTRO', 'CHOOSE-LANG', 'CONFIRM-LANG'], [5, 0, 3]);
};

const enConfirmLanguage = async (agent) => {
	const senderID = util.getSenderID(agent);
	const bool = agent.parameters.affirm;

	if (bool === 'AFFIRM') {
		// Response
		agent.add('Before you get to access my features >.>');
		agent.add(`I need to state that I'm a symptom checker chatbot aimed to provide medical impressions on your condition.`);
		agent.add(`I'm not meant to be a replacement for a doctor's diagnosis`);
		agent.add(`For more details, here is a link to my terms of service: [LINK]`);
		agent.add('Do you accept these terms?');

		// Context
		util.setContexts(agent, ['PHASE-INTRO', 'CONFIRM-LANG', 'CONFIRM-TERMS'], [5, 0, 3]);
	} else {
		// Response
		agent.add('My apologies :<');
		agent.add(util.buildQuickReplyPayload(agent, 'Let me ask again, what is your preferred langauge?', ['English', 'Filipino']));

		// Update User
		db.updateUser(senderID, {language: false});

		// Context
		util.setContexts(agent, ['PHASE-INTRO', 'CHOOSE-LANG'], [5, 3]);
	}
};

const enConfirmTerms = async (agent) => {
	const senderID = util.getSenderID(agent);
	const bool = agent.parameters.affirm;

	if (bool === 'AFFIRM') {
		const state = getUserState(senderID).COMMAND;
		
		if (state === 'CHECKUP') {
			// Response	
			agent.add(`Thanks! Let's get started then.'`);
			agent.add('How have you been feeling?');
		} else {
			// Response
			agent.add(`Thanks! Let's get started then.`);
			agent.add('What would you like to ask me?');
		}

		// Update User
		db.updateUser(senderID, {terms: true});

		// Context
		util.setContexts(agent, ['PHASE-INTRO', 'CONFIRM-TERMS', 'PHASE-CHECK'], [0, 0, 5]);    	// TODO CHANGE
	} else {
		// Response
		agent.add('Aww :< you need to accept my terms & conditions to use my features.');
		agent.add('If you ever change your mind, talk to me again.');

		// Context
		util.setContexts(agent, ['PHASE-INTRO', 'CONFIRM-TERMS'], [0, 0]);
	}	
	// States
	delUserState(senderID);
};

module.exports = {
	enConfirmIntroStart,
	enConfirmLanguage,
	enChooseLanguage,
	enConfirmTerms
};
