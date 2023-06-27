const util = require('./utility.js');
const db = require('../firebase/database.js');

/*
	Webhook Functions: Starting Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

// Load Dialogue
const introduction_dialogue = JSON.parse(require('fs').readFileSync('./fulfillment/dialogue/introduction-dialogue.json', 'utf8'));

async function enUserStartGreet(agent) {
	// Response	
	const response = introduction_dialogue.en_user_start_greet;
	util.respond(agent, response);
};

async function enUserStartCheckup(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Response
	if (!data) {
		const response = introduction_dialogue.en_user_start_new;
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-START-INTRODUCTION'], [5, 3]);
		db.createAgent(senderID, {command: 'CHECKUP'});
	} else {
		if (!data.user.terms) {
			const response = introduction_dialogue.en_user_start_term_unaccepted;
			util.respond(agent, response);
			util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-TERMS'], [5, 3]);
		} else {
			const response = introduction_dialogue.en_user_start_checkup_term_accepted;
			util.respond(agent, response);
			util.setContexts(agent, ['PHASE-INTRODUCTION', 'PHASE-ELICITATION'], [0, 5]);		
		}
	}
};

async function enUserStartQuery(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Response
	if (!data) {
		const response = introduction_dialogue.en_user_start_new;
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-START-INTRODUCTION'], [5, 3]);
		db.createAgent(senderID, {command: 'QUERY'});
	} else {
		if (!data.user.terms) {
			const response = introduction_dialogue.en_user_start_term_unaccepted;
			util.respond(agent, response);
			util.setContexts(agent, ['PHASE-INTRODUCTION', 'CONFIRM-TERMS'], [5, 3]);
		} else {
			const response = introduction_dialogue.en_user_start_query_term_accepted;
			util.respond(agent, response);
			util.setContexts(agent, ['PHASE-INTRODUCTION', 'PHASE-ELICITATION'], [0, 5]);		
		}
	}
};

module.exports = {
	enUserStartGreet,
	enUserStartCheckup,
	enUserStartQuery,
};

