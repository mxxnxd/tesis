const util = require('./utility.js');
const db = require('../firebase/database.js');
const rule = require('../rules/rules-engine.js');

const default_symptoms = {
	abdomen_pain: 0, 
	anxiety: 0, 
	appetite_loss: 0, 
	arm_pain: 0, 
	back_pain: 0, 
	belly_swell: 0, 
	blurry: 0, 
	bone_pain: 0, 
	tachypnea: 0, 
	chest_pain: 0, 
	chest_tight: 0, 
	chills: 0, 
	colds: 0, 
	confusion: 0, 
	cough: 0, 
	cyanosis: 0, 
	dizzy: 0, 
	dysphasia: 0, 
	dyspnea: 0, 
	faint: 0, 
	fatigue: 0, 
	fever: 0, 
	headaches: 0, 
	heartburn: 0, 
	hoarseness: 0, 
	legs_swell: 0, 
	mouth_pain: 0, 
	muscle_pain: 0, 
	nausea: 0, 
	neck_shoulder_pain: 0, 
	neck_swell: 0, 
	neck_tight: 0, 
	pale_sweat: 0, 
	phlegm_clear: 0, 
	phlegm_green: 0, 
	phlegm_red: 0, 
	phlegm_white: 0, 
	r_infections: 0, 
	sleep_hard: 0, 
	tachycardia: 0, 
	urine_blood: 0,
	weakness: 0, 
	weightgain: 0, 
	weightloss: 0, 
	wheeze: 0 
};

/*
	Webhook Functions: Starting Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

const en_start_checkup = async (agent) => {
	const senderID = util.getSenderID(agent);
	var user = await db.getUser(senderID);

	if (!user) {
		util.triggerEvent(agent, 'EN-ASK-LANGUAGE');

	} else {
		// Set Default Facts
		await db.updateUser(senderID, {symptoms: default_symptoms, diagnosis: {illness: 0, severity: 0}, group: {phlegm: false}});
		
		user = await db.getUser(senderID);
		var fact = {user: user,agent: {next_action: 0}};

		// Get First Action from Rules-Engine
		const res = await rule.getAction(fact);
		
		// Trigger Action
		util.setContexts(agent, ['PH-CHECK', 'CX-CFM-SYMP'], [0, 0]);
		// agent.add(`Alright! I'll be asking a series of questions regarding your well being :>`);
		util.triggerEvent(agent, res.agent.next_action);
	}
};

const en_start_question = async (agent) => {
	var user = await db.getUser(util.getSenderID(agent));

	if (!user) {
		util.triggerEvent(agent, 'EN-ASK-LANGUAGE');

	} else {
		util.triggerEvent(agent, 'EN-GET-QUESTION');

		// QUERY LOGIC	

	}
};

const fi_start_checkup = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC (DETERMINE NEW USER)

};

const fi_start_question = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC (DETERMINE NEW USER)

};

module.exports = {
	en_start_checkup,
	en_start_question
};

