const util = require('./utility.js');
const db = require('../firebase/database.js');
const { delUserState, getUserState, setUserState } = require('../firebase/state.js');

/*
	Webhook Functions: Query Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const enQueryDiseaseCause = async (agent) => {
	// const senderID = util.getSenderID(agent);

	agent.add('GOT IT');
};

const enQueryDiseaseDefinition = async (agent) => {
	// const senderID = util.getSenderID(agent);

	agent.add('GOT IT');
};

const enQueryDiseaseSymptom = async (agent) => {
	// const senderID = util.getSenderID(agent);

	agent.add('GOT IT');
};

const enQuerySymptomDefinition = async (agent) => {
	// const senderID = util.getSenderID(agent);

	agent.add('GOT IT');
};

module.exports = {
	enQueryDiseaseCause,
	enQueryDiseaseDefinition,
	enQueryDiseaseSymptom,
};
