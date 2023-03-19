const util = require('./utility.js');
const rule = require('../rules/rules-engine.js');
const db = require('../firebase/database.js');

/*
	Webhook Functions: Symptom Extraction Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */

var userSympMap = new Map();

/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_symptom = async (agent) => {
	const senderID = util.getSenderID(agent);
	var user = await db.getUser(senderID);
	var fact = {user: user, agent: {next_action: 0}};

	// Get First Action from Rules-Engine
	const res = await rule.getAction(fact);
			
	// Trigger Action
	userSympMap.set(senderID, util.getEventToKey(res.agent.next_action));
	util.setContexts(agent, ['PH-CHECK', 'CX-CFM-SYMP'], [0, 0]);
	util.triggerEvent(agent, res.agent.next_action);
	console.log(`USER: ${senderID} ACTION: ${res.agent.next_action}`);
};

const en_get_symptom_yes = async (agent) => {
	const senderID = util.getSenderID(agent);

	var edit = {};
	edit[userSympMap.get(senderID)] = true;
	await db.updateSymptom(senderID, edit);

	var user = await db.getUser(senderID);
	var fact = {user: user, agent: {next_action: 0}};

	// Get Next Action from Rules-Engine
	const res = await rule.getAction(fact);

	// Trigger Action
	userSympMap.set(senderID, util.getEventToKey(res.agent.next_action));
	
	util.setContexts(agent, ['PH-CHECK', 'CX-CFM-SYMP'], [0, 0]);
	util.triggerEvent(agent, res.agent.next_action);
	console.log(`USER: ${senderID} ACTION: ${res.agent.next_action}`);
};

const en_get_symptom_no = async (agent) => {
	const senderID = util.getSenderID(agent);

	var edit = {};
	edit[userSympMap.get(senderID)] = false;
	await db.updateSymptom(senderID, edit);

	var user = await db.getUser(senderID);
	var fact = {user: user, agent: {next_action: 0}};

	// Get Next Action from Rules-Engine
	const res = await rule.getAction(fact);

	// Trigger Action
	userSympMap.set(senderID, util.getEventToKey(res.agent.next_action));
	
	util.setContexts(agent, ['PH-CHECK', 'CX-CFM-SYMP'], [0, 0]);
	util.triggerEvent(agent, res.agent.next_action);
	console.log(`USER: ${senderID} ACTION: ${res.agent.next_action}`);
};

module.exports = {
	en_get_symptom,
	en_get_symptom_yes,
	en_get_symptom_no
};