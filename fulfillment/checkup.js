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
const jsonData = fs.readFileSync('./fulfillment/agent-checkup-dialogue.json', 'utf8');
const responses = JSON.parse(jsonData);

const enConfirmSymptom = async (agent) => {
	const senderID = util.getSenderID(agent);
	var facts = await handleAgentParameters(agent, 'AFFIRM');

	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}

	// Response
	const res = await rule.getAction(facts);
	console.log(`${senderID}: ${res.agent.next_action}`);
	handleAgentAction(agent, res.agent.next_action, res.user.positive_symptoms);

	// Update User Data
	db.updateUser(senderID, res.user);
	db.updateAgent(senderID, res.agent);
	// db.updateUser(senderID, {start: res.user.start});
};

const enShareSymptomPositive = async (agent) => {
	const senderID = util.getSenderID(agent);
	var facts = await handleAgentParameters(agent, 'POSITIVE');

	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}

	// Response
	const res = await rule.getAction(facts);
	console.log(`${senderID}: ${res.agent.next_action}`);
	handleAgentAction(agent, res.agent.next_action, res.user.positive_symptoms);

	// Update User Data
	db.updateUser(senderID, res.user);
	db.updateAgent(senderID, res.agent);
	// db.updateUser(senderID, {start: res.user.start});
};

const enShareSymptomNegative = async (agent) => {
	const senderID = util.getSenderID(agent);
	var facts = await handleAgentParameters(agent, 'NEGATIVE');
	
	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}

	// Response
	const res = await rule.getAction(facts);
	console.log(`${senderID}: ${res.agent.next_action}`);
	handleAgentAction(agent, res.agent.next_action, res.user.positive_symptoms);

	// Update User Data
	db.updateUser(senderID, res.user);
	db.updateAgent(senderID, res.agent);
	// db.updateUser(senderID, {start: res.user.start});
};

const enShareFeeling = async (agent) => {										// Add Variations
	if (util.getSentimentScore > 0.5) {
		agent.add('Oh ok, could you share some symptoms you are experiencing?');
	} else {
		agent.add('Aww :<');
		agent.add('could you share some symptoms that is making you feel bad?');
	}
};

const enShareBloodPressure = async (agent) => {
	const senderID = util.getSenderID(agent);

	const blood_pressure = agent.parameters.number;
	const systolic = blood_pressure[0];
	const diastolic = blood_pressure[1];

	db.updateUserSeverity(senderID, {blood_pressure: {
		systolic: systolic,
		diastolic: diastolic
	}});

	agent.add('GOT IT');
	util.setContexts(agent,['PHASE-CHECK'], [5]);
};

const enShareAge = async (agent) => {
	const senderID = util.getSenderID(agent);

	const age = agent.parameters.age;
	db.updateUserSeverity(senderID, {age: age});

	agent.add('GOT IT');
	util.setContexts(agent,['PHASE-CHECK'], [5]);
};

const enShareGender = async (agent) => {
	const senderID = util.getSenderID(agent);

	const gender = agent.parameters.bot_gender;
	db.updateUserSeverity(senderID, {gender: gender});

	agent.add('GOT IT');
	util.setContexts(agent,['PHASE-CHECK'], [5]);
};

const enShareWeight = async (agent) => {
	const senderID = util.getSenderID(agent);
	var facts = await handleAgentParameters(agent, 'WEIGHT');

	// Get Next Agent Action
	if (facts.agent.next_action) {
		delete facts.agent.next_action;
	}

	// Response
	const res = await rule.getAction(facts);
	console.log(`${senderID}: ${res.agent.next_action}`);
	handleAgentAction(agent, res.agent.next_action, res.user.positive_symptoms);

	// Update User Data
	db.updateUser(senderID, res.user);
	db.updateAgent(senderID, res.agent);

	util.setContexts(agent,['PHASE-CHECK'], [5]);
};

module.exports = {
	enConfirmSymptom,
	enShareSymptomPositive,
	enShareSymptomNegative,
	enShareFeeling,
	enShareBloodPressure,
	enShareAge,
	enShareGender,
	enShareWeight,
};


async function handleAgentParameters(agent, type) {
	// Fetch Data
	const senderID = util.getSenderID(agent);
	var facts = await db.getUser(senderID);
	facts = await fetchPreviousSymptoms(senderID, facts);

	// Get Parameter Data
	const bool = agent.parameters.affirm;
	const symptoms = agent.parameters.symptom;
	const body_parts = agent.parameters.body_part;
	const body_condition = agent.parameters.body_condition;

	// Clean Facts
	facts = cleanFacts(facts);

	// Get Symptoms
	var acquired_symptoms = [];

	if (type === 'AFFIRM') {
		const investigated_symptom = facts.agent.next_action.toLowerCase().split('-')[1];

		if (bool === 'AFFIRM') {
			facts.agent.phlegmNeeded = (investigated_symptom === 'phlegm');
			facts.agent.weightNeeded = (investigated_symptom === 'weightgain' || investigated_symptom === 'weightloss');

			// Add User Positive Symptoms
			if (!facts.agent.phlegmNeeded ) {
				facts.user.positive_symptoms = Array.from(new Set(facts.user.positive_symptoms.concat([investigated_symptom])));
			}
		} else if (bool === 'NEGATE') {
			// Add User Negative Symptoms
			facts.user.negative_symptoms = Array.from(new Set(facts.user.negative_symptoms.concat([investigated_symptom])));
		} else {
			agent.add("I did not quite get that? Do you have the symptom?");
		}

	} else if (type === 'POSITIVE' || type === 'NEGATIVE') {
		symptoms.forEach(symptom => {
			facts.agent.phlegmNeeded = (type === 'POSITIVE' && symptom === 'PHLEGM');

			if (!facts.agent.phlegmNeeded) {
				acquired_symptoms.push(symptom.toLowerCase());
			}
		});
		body_parts.forEach(part => {
			const body_symptom = util.getSymptomCondition(part, body_condition);
			if (body_symptom != null) {
				acquired_symptoms.push(body_symptom);
			}
		});

		if (type === 'POSITIVE') {
			facts.user.positive_symptoms = Array.from(new Set(facts.user.positive_symptoms.concat(acquired_symptoms)));
		} else if (type === 'NEGATIVE') {
			facts.user.negative_symptoms = Array.from(new Set(facts.user.negative_symptoms.concat(acquired_symptoms)));
		}
	} else if (type === 'WEIGHT') {
		const weight = agent.parameters.weight;
		facts.user.severity.weight = weight;
	}

	console.log(facts);

	return facts;
};

function handleAgentAction(agent, action, positive_symptoms) {
	const senderID = util.getSenderID(agent);
	console.log(`Handing Action: ${action}`)

	// Response
	if (action.startsWith('ASK')) {				
		const response = responses[action.toLowerCase().split('-')[1]].ask_symptom;
		agent.add(response[Math.floor(Math.random() * response.length)]);
		util.setContexts(agent,['PHASE-CHECK'], [5]);
		return; 
	}

	if (action.startsWith('RECALL')) {
		const response = responses[action.toLowerCase().split('-')[1]].recall_symptom;
		agent.add(response[Math.floor(Math.random() * response.length)]);
		util.setContexts(agent,['PHASE-CHECK'], [5]);
		return; 
	}

	if (action.startsWith('DIAGNOSE')) {
		const response = responses[action.toLowerCase().split('-')[1]].response_impression;
		agent.add(response[Math.floor(Math.random() * response.length)]);

		agent.add('I advise you to make an appointment with your doctor to get a more detailed and official diagnosis of your condition.')
		util.setContexts(agent, ['PHASE-CHECK'], [0]);

		const timestamp = Math.floor(Date.now() / 1000);
		db.updateUser(senderID, {latest_session: timestamp, recall: true});
		db.createSession(senderID, timestamp, {previous_symptoms: positive_symptoms})
		return;
	};

	if (action.startsWith('NO-DIAGNOSIS')) {
		agent.add('You seem fine but if present symptoms worsen please contact your physician or try again.');
		util.setContexts(agent, ['PHASE-CHECK'], [0]);

		const timestamp = Math.floor(Date.now() / 1000);
		db.updateUser(senderID, {latest_session: timestamp, recall: true});
		db.createSession(senderID, timestamp, {previous_symptoms: positive_symptoms})
	}
}

async function fetchPreviousSymptoms(senderID, facts) {
	// Load Previous Symptoms if there is any
	if (facts.user.recall) {
		const session = await db.getSession(senderID, facts.user.latest_session);
		facts.user.previous_symptoms = session.previous_symptoms;
		db.updateUser(senderID, {recall: false});
	} 
	return facts;
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
