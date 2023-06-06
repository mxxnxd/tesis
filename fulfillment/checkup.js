const util = require('./utility.js');
const db = require('../firebase/database.js');
const { delUserState, getUserState, setUserState } = require('../firebase/state.js');

/*
	Webhook Functions: Symptom Elicitation Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const enShareSymptomPositive = async (agent) => {
	// const senderID = util.getSenderID(agent);

	console.log('POSI')
	console.log(agent.parameters);

	agent.add('GOT IT');
};

const enShareSymptomNegative = async (agent) => {
	// const senderID = util.getSenderID(agent);

	console.log('NEGA');
	console.log(agent.parameters);

	agent.add('GOT IT');
};

const enShareFeeling = async (agent) => {
	// const senderID = util.getSenderID(agent);

	console.log('FEEELINGS');
	agent.add('GOT IT');
};

module.exports = {
	enShareSymptomPositive,
	enShareSymptomNegative,
	enShareFeeling,
};
