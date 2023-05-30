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
	// const senderID = util.getSenderID(agent);
	const senderID = 1231;
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
		agent.add('Ok! we can get started :>');

		console.log('ELSE CHECKUP');
	}
};

const enCommandQuery = async (agent) => {

};

module.exports = {
	enCommandCheckup,
	enCommandQuery
};

