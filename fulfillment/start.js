const util = require('./utility.js');
const db = require('../firebase/database.js');
const rule = require('../rules/rules-engine.js');

const default_symptoms = {
	abdomen_pain: '', 
	anxiety: '', 
	appetite_loss: '', 
	arm_pain: '', 
	back_pain: '', 
	belly_swell: '', 
	blurry: '', 
	bone_pain: '', 
	tachypnea: '', 
	chest_pain: '', 
	chest_tight: '', 
	chills: '', 
	colds: '', 
	confusion: '', 
	cough: '', 
	cyanosis: '', 
	dizzy: '', 
	dysphasia: '', 
	dyspnea: '', 
	faint: '', 
	fatigue: '', 
	fever: '', 
	headaches: '', 
	heartburn: '', 
	hoarseness: '', 
	legs_swell: '', 
	mouth_pain: '', 
	muscle_pain: '', 
	nausea: '', 
	neck_shoulder_pain: '', 
	neck_swell: '', 
	neck_tight: '', 
	pale_sweat: '', 
	phlegm_clear: '', 
	phlegm_green: '', 
	phlegm_red: '', 
	phlegm_white: '', 
	r_infections: '', 
	sleep_hard: '', 
	tachycardia: '', 
	urine_blood: '',
	weakness: '', 
	weightgain: '', 
	weightloss: '', 
	wheeze: '' 
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
		await db.updateUser(senderID, {symptoms: default_symptoms, diagnosis: {illness: 0, severity: 0}, group: {phlegm: '', swell: '', vertigo: '', hectic_fever: ''}});
		util.triggerEvent(agent, 'EN-ASK-SYMPTOM');
	}
};

const en_start_question = async (agent) => {
	var user = await db.getUser(util.getSenderID(agent));

	if (!user) {
		util.triggerEvent(agent, 'EN-ASK-LANGUAGE');

	} else {
		util.setContexts(agent, ['PH-QUERY'], [3]);
		agent.add('Alright! what question do you have for me?');
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

