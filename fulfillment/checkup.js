const fs = require('fs');
const util = require('./utility.js');
const db = require('../firebase/database.js');
const rule = require('../rules/rules-engine.js');
const { delUserState, getUserState, setUserState } = require('../firebase/state.js');
const { send } = require('process');

/*
/*
	Webhook Functions: Symptom Elicitation Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

// JSON
const jsonData = fs.readFileSync('./fulfillment/agent-query-question-dialogue.json', 'utf8');
const responses = JSON.parse(jsonData);

const enConfirmSymptom = async (agent) => {
	// Get User
	const senderID = util.getSenderID(agent);
	var facts = await db.getUser(senderID);
	
	// Get Parameters
	const bool = agent.parameters.affirm;
	facts = cleanFacts(facts);

	const investigated_symptom = facts.agent.next_action.toLowerCase().split('-')[1];

	if (bool === 'AFFIRM') {
		// Add User Positive Symptoms
		facts.user.positive_symptoms = Array.from(new Set(facts.user.positive_symptoms.concat([investigated_symptom])));
		
	} else {
		// Add User Negative Symptoms
		facts.user.negative_symptoms = Array.from(new Set(facts.user.negative_symptoms.concat([investigated_symptom])));
	}

	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}

	console.log(facts);

	// Response
	const res = await rule.getAction(facts);
	handleAgentAction(agent, res.agent.next_action);


	console.log(res);

	// Update User Data
	db.updateUser(senderID, {positive_symptoms: res.user.positive_symptoms});
	db.updateUser(senderID, {negative_symptoms: res.user.negative_symptoms});
	db.updateUser(senderID, {start: res.user.start});
	db.updateAgent(senderID, {next_action: res.agent.next_action});
};

const enShareSymptomPositive = async (agent) => {
	// Get User
	const senderID = util.getSenderID(agent);
	var facts = await db.getUser(senderID);
	
	// Get Parameters
	const symptoms = agent.parameters.symptom;
	const body_parts = agent.parameters.body_part;
	const body_condition = agent.parameters.body_condition;

	// Get All Symptoms Mentioned
	var acquired_symptoms = [];
	symptoms.forEach(symptom => acquired_symptoms.push(symptom.toLowerCase()));
	body_parts.forEach(part => {
		const body_symptom = util.getSymptomCondition(part, body_condition);
		if (body_symptom != null) {
			acquired_symptoms.push(body_symptom);
		}
	});

	// Add User Positive Symptoms
	facts = cleanFacts(facts);
	facts.user.positive_symptoms = Array.from(new Set(facts.user.positive_symptoms.concat(acquired_symptoms)));

	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}
	const res = await rule.getAction(facts);

	// Response
	handleAgentAction(agent, res.agent.next_action);

	// Update User Data
	db.updateUser(senderID, {positive_symptoms: res.user.positive_symptoms});
	db.updateUser(senderID, {start: res.user.start});
	db.updateAgent(senderID, {next_action: res.agent.next_action});
};

const enShareSymptomNegative = async (agent) => {
	// Get User
	const senderID = util.getSenderID(agent);
	var facts = await db.getUser(senderID);
	
	// Get Parameters
	const symptoms = agent.parameters.symptom;
	const body_parts = agent.parameters.body_part;
	const body_condition = agent.parameters.body_condition;

	// Get All Symptoms Mentioned
	var acquired_symptoms = [];
	symptoms.forEach(symptom => acquired_symptoms.push(symptom.toLowerCase()));
	body_parts.forEach(part => {
		const body_symptom = util.getSymptomCondition(part, body_condition);
		if (body_symptom != null) {
			acquired_symptoms.push(body_symptom);
		}
	});

	// Add User Positive Symptoms
	facts = cleanFacts(facts);
	facts.user.negative_symptoms = Array.from(new Set(facts.user.negative_symptoms.concat(acquired_symptoms)));

	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}
	const res = await rule.getAction(facts);

	// Response
	handleAgentAction(agent, res.agent.next_action);

	// Update User Data
	db.updateUser(senderID, {negative_symptoms: res.user.negative_symptoms});
	db.updateUser(senderID, {start: res.user.start});
	db.updateAgent(senderID, {next_action: res.agent.next_action});
};

const enShareFeeling = async (agent) => {
	if (util.getSentimentScore > 0.5) {
		agent.add(':o could you share some symptoms you are experiencing?');
	} else {
		agent.add('Aww :<');
		agent.add('Could some symptoms that is making you feel bad?');
	}
};

module.exports = {
	enConfirmSymptom,
	enShareSymptomPositive,
	enShareSymptomNegative,
	enShareFeeling,
};

function handleAgentAction(agent, action) {

	// Response
	if (action.startsWith('ASK') || action.startsWith('RECALL')) {				// Change Dialogue for RECALL
		const response = responses[action.toLowerCase().split('-')[1]];
		agent.add(response[Math.floor(Math.random() * response.length)]);
		util.setContexts(agent,['PHASE-CHECK'], [5]);
	}

	if (action.startsWith('DIAGNOSE')) {
		agent.add(action);
		util.setContexts(agent,['PHASE-CHECK'], [0]);
	};

}

function cleanFacts(facts) {
	if (!facts.user.positive_symptoms) {
		facts.user.positive_symptoms = [];
	}
	if (!facts.user.negative_symptoms) {
		facts.user.negative_symptoms = [];
	}
	if (!facts.user.previous_symptoms) {
		facts.user.previous_symptoms = [];
	}
	return facts;
}
