const util = require('./utility.js');
const db = require('../firebase/database.js');
const { getUserState, setUserState } = require('../firebase/state.js');

/*
	Webhook Functions: Starting Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const enCommandCheckup= async (agent) => {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const user = await db.getUser(senderID);

	// Check Recurring User
	if (!user) {
		// Respond (Acknowledge & Pump)
		agent.add('Noted :>');
		agent.add('It seems like this is your first time, do you mind if ask you some questions?');

		// Set Contexts & States
		util.setContexts(agent, ['PHASE-INTRO', 'START-INTRO'], [5, 3]);	
		setUserState(util.getSenderID(agent), {COMMAND: 'CHECKUP'});									// TODO CHANGE
	} else {		
		if (!user.user.terms) {
			// Response
			agent.add('It seems you have not yet accepted my terms of service :<')
			agent.add('Before you get to access my features >.>');
			agent.add(`I need to state that I'm a symptom checker chatbot aimed to provide medical impressions on your condition.`);
			agent.add(`I'm not meant to be a replacement for a doctor's diagnosis`);
			agent.add(`For more details, here is a link to my terms of service: [LINK]`);
			agent.add('Do you accept these terms?');
			
			// Set Contexts & States
			util.setContexts(agent, ['PHASE-INTRO', 'CONFIRM-TERMS'], [5, 3]);
			setUserState(util.getSenderID(agent), {COMMAND: 'CHECKUP'});
		} else {
			// Response
			agent.add('Ok! we can get started :>');
			agent.add('How have you been feeling?');

			// Clear
			db.updateUser(senderID, {positive_symptoms: [], negative_symptoms: []});
			db.updateAgent(senderID, {flags: {
				ask_weight: 0,
				ask_phlegm: 0,
			}});

			// Set Contexts
			util.setContexts(agent, ['PHASE-CHECK'], [5]);	
		}
	}
};

const enCommandQuery = async (agent) => {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const user = await db.getUser(senderID);

	// Check Recurring User
	if (!user) {
		// Respond (Acknowledge & Pump)
		agent.add('Noted :>');
		agent.add('It seems like this is your first time, do you mind if ask you some questions?');

		// Set Contexts & States
		util.setContexts(agent, ['PHASE-INTRO', 'START-INTRO'], [5, 3]);	
		setUserState(util.getSenderID(agent), {COMMAND: 'CHECKUP'});									// TODO CHANGE
	} else {		
		if (!user.user.terms) {
			// Response
			agent.add('It seems you have not yet accepted my terms of service :<')
			agent.add('Before you get to access my features >.>');
			agent.add(`I need to state that I'm a symptom checker chatbot aimed to provide medical impressions on your condition.`);
			agent.add(`I'm not meant to be a replacement for a doctor's diagnosis`);
			agent.add(`For more details, here is a link to my terms of service: [LINK]`);
			agent.add('Do you accept these terms?');
			
			// Set Contexts & States
			util.setContexts(agent, ['PHASE-INTRO', 'CONFIRM-TERMS'], [5, 3]);
			setUserState(util.getSenderID(agent), {COMMAND: 'CHECKUP'});
		} else {
			// Response
			agent.add('Ok! we can get started :>');
			agent.add('What do you want to ask me?');

			// Set Contexts
			util.setContexts(agent, ['PHASE-QUERY'], [5]);	
		}
	}
};

module.exports = {
	enCommandCheckup,
	enCommandQuery
};

