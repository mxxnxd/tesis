const fs = require('fs');
const util = require('./utility.js');
const db = require('../firebase/database.js');
const rule = require('../rules/rules-engine.js');

/*
/*
	Webhook Functions: Symptom Elicitation Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */

/* ========== ========== ========== ========== ========== ========== ========== */

// Load Dialogue
const elicitation_dialogue = JSON.parse(require('fs').readFileSync('./fulfillment/dialogue/elicitation-dialogue.json', 'utf8'));


// REMOVE
const jsonData = fs.readFileSync('./fulfillment/agent-checkup-dialogue.json', 'utf8');
const responses = JSON.parse(jsonData);

function cleanData(data) {
	// Populate Missing Fields (Firebase does not store empty values)
	if (!data.user.positive_symptoms) {
		data.user.positive_symptoms = [];
	}
	if (!data.user.negative_symptoms) {
		data.user.negative_symptoms = [];
	}
	if (!data.user.previous_symptoms) {
		data.user.previous_symptoms = [];
	}
	return data;
};

function handleEliciationResponse(agent, data) {
	// Fetch Action
	const next_action = data.agent.next_action.split('-');
	const action = next_action[0];
	const subject = next_action[1];

	// Response
	if (action === 'ASK') {
		const response = elicitation_dialogue.en_user_share_symptom_ask[subject];
		util.respond(agent, response);
		util.setContexts(agent, ['PHASE-ELICITATION'], [5]);
	}
	if (action === 'RECALL') {
		agent.add('RECALL');
	}
	if (action === 'DIAGNOSE') {
		agent.add('DIAGNOSE');
	}
	if (action === 'NO') {
		agent.add('NO');
	}
};

async function enUserShareSymptomPartYes(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Fetch Parameters
	const body_subject = agent.parameters.body_subject;
	const body_condition = agent.parameters.body_condition;

	// Update Data
	var cleaned_data = cleanData(data);
	const new_symptom = util.extractSymptomFromKeywords(body_subject, body_condition);
	if (new_symptom) {
		cleaned_data.user.positive_symptoms =  Array.from(new Set(cleaned_data.user.positive_symptoms.concat([new_symptom])));
	} else {
		// OTHER DIALOGUE?
		console.log('ERROR NEW_SYMPTOM');
	}

	// Fetch Next Action
	var processed_data = await rule.getAction(cleaned_data);
	console.log(`${senderID}: ${processed_data.agent.next_action}`);

	// Response
	handleEliciationResponse(agent, processed_data);

	// Update User Data
	db.updateUser(senderID, processed_data.user);
	db.updateAgent(senderID, processed_data.agent);
};

async function enUserShareSymptomPartNo(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Fetch Parameters
	const body_subject = agent.parameters.body_subject;
	const body_condition = agent.parameters.body_condition;

	// Update Data
	var cleaned_data = cleanData(data);
	const new_symptom = util.extractSymptomFromKeywords(body_subject, body_condition);
	if (new_symptom) {
		cleaned_data.user.negative_symptoms =  Array.from(new Set(cleaned_data.user.negative_symptoms.concat([new_symptom])));
	} else {
		// OTHER DIALOGUE?
		console.log('ERROR NEW_SYMPTOM');
	}

	// Fetch Next Action
	var processed_data = await rule.getAction(cleaned_data);
	console.log(`${senderID}: ${processed_data.agent.next_action}`);

	// Response
	handleEliciationResponse(agent, processed_data);

	// Update User Data
	db.updateUser(senderID, processed_data.user);
	db.updateAgent(senderID, processed_data.agent);
};

async function enUserShareSymptomYes(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Fetch Parameters
	const new_symptom = agent.parameters.symptom;

	// Update Data
	var cleaned_data = cleanData(data);
	if (new_symptom) {
		cleaned_data.user.positive_symptoms =  Array.from(new Set(cleaned_data.user.positive_symptoms.concat([new_symptom])));
	} else {
		// OTHER DIALOGUE?
		console.log('ERROR NEW_SYMPTOM');
	}

	// Fetch Next Action
	var processed_data = await rule.getAction(cleaned_data);
	console.log(`${senderID}: ${processed_data.agent.next_action}`);

	// Response
	handleEliciationResponse(agent, processed_data);

	// Update User Data
	db.updateUser(senderID, processed_data.user);
	db.updateAgent(senderID, processed_data.agent);
};

async function enUserShareSymptomNo(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Fetch Parameters
	const new_symptom = agent.parameters.symptom;

	// Update Data
	var cleaned_data = cleanData(data);
	if (new_symptom) {
		cleaned_data.user.negative_symptoms =  Array.from(new Set(cleaned_data.user.negative_symptoms.concat([new_symptom])));
	} else {
		// OTHER DIALOGUE?
		console.log('ERROR NEW_SYMPTOM');
	}

	// Fetch Next Action
	var processed_data = await rule.getAction(cleaned_data);
	console.log(`${senderID}: ${processed_data.agent.next_action}`);

	// Response
	handleEliciationResponse(agent, processed_data);

	// Update User Data
	db.updateUser(senderID, processed_data.user);
	db.updateAgent(senderID, processed_data.agent);
};

async function enUserConfirmSymptom(agent) {
	// Fetch User
	const senderID = util.getSenderID(agent);
	const data = await db.getUser(senderID);

	// Fetch Parameters
	const bool = agent.parameters.affirm;

	// Update 
	var cleaned_data = cleanData(data);
	const new_symptom = cleaned_data.agent.next_action.split('-')[1];
	if (bool === 'AFFIRM') {
		cleaned_data.user.positive_symptoms =  Array.from(new Set(cleaned_data.user.positive_symptoms.concat([new_symptom])));
	} else {
		cleaned_data.user.negative_symptoms =  Array.from(new Set(cleaned_data.user.negative_symptoms.concat([new_symptom])));
	}

	// Fetch Next Action
	var processed_data = await rule.getAction(cleaned_data);
	console.log(`${senderID}: ${processed_data.agent.next_action}`);

	// Response
	handleEliciationResponse(agent, processed_data);

	// Update User Data
	db.updateUser(senderID, processed_data.user);
	db.updateAgent(senderID, processed_data.agent);
};



// OLD
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
	var facts = await handleAgentParameters(agent, 'BLOOD_PRESSURE');

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

const enShareAge = async (agent) => {
	const senderID = util.getSenderID(agent);
	var facts = await handleAgentParameters(agent, 'AGE');

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

const enShareGender = async (agent) => {
	const senderID = util.getSenderID(agent);
	var facts = await handleAgentParameters(agent, 'GENDER');

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
			// Add User Positive Symptoms
			facts.user.positive_symptoms = Array.from(new Set(facts.user.positive_symptoms.concat([investigated_symptom])));
			
		} else if (bool === 'NEGATE') {
			// Add User Negative Symptoms
			facts.user.negative_symptoms = Array.from(new Set(facts.user.negative_symptoms.concat([investigated_symptom])));
		} else {
			agent.add("I did not quite get that? Do you have the symptom?");
		}

	} else if (type === 'POSITIVE' || type === 'NEGATIVE') {
		symptoms.forEach(symptom => {
			acquired_symptoms.push(symptom.toLowerCase());
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
	} else if (type === 'AGE') {
		const age = agent.parameters.age;
		facts.user.severity.age = age;
	} else if (type === 'GENDER') {
		const gender = agent.parameters.bot_gender;
		facts.user.severity.gender = gender;
	} else if (type === 'BLOOD_PRESSURE') {
		const blood_pressure = agent.parameters.number;
		const systolic = blood_pressure[0];
		const diastolic = blood_pressure[1];	

		facts.user.severity.blood_pressure = {
			systolic: systolic,
			diastolic: diastolic,
		}
	}
	return facts;
};

function handleAgentAction(agent, action, positive_symptoms) {
	const senderID = util.getSenderID(agent);
	// console.log(`Handing Action: ${action}`)

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

module.exports = {
	enUserShareSymptomPartYes,
	enUserShareSymptomPartNo,
	enUserShareSymptomYes,
	enUserShareSymptomNo,
	enUserConfirmSymptom,
};