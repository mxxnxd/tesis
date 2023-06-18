const util = require('./utility.js');
const db = require('../firebase/database.js');
const { delUserState, getUserState, setUserState } = require('../firebase/state.js');
const rule = require('../rules/rules-engine.js');
const fs = require('fs');

/*
/*
	Webhook Functions: Symptom Elicitation Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */

// get data from json file
const jsonData = fs.readFileSync('./fulfillment/disease-symptom.json', 'utf8');
const disease_symptom = JSON.parse(jsonData);


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

// determine which disease to focus on after initial input
const determineInitialDisease = (params) => {
	const matches = [];
	const user_symptoms = params.symptom;
	for (const {disease, symptom} of disease_symptom) {
		// uses every() so it wont recognize if user input is from different diseases
		if (user_symptoms.every(temp => symptom.includes(temp.toLowerCase()))) { // we could change the json file to all caps, otherwise keep toLowerCase()
			matches.push(disease);
		}
	}
	//console.log('matches: ' + matches)
	return {matches, user_symptoms};
}

const enShareSymptomPositive = async (agent) => {
	// const senderID = util.getSenderID(agent);

	//const senderID = util.getSenderID(agent);
	//var user = await db.getUser(senderID);
	
	// if (!user) {
	// 	db.createUser(senderID, {symptoms: default_symptoms, diagnosis: {illness: 0, severity: 0}, group: {phlegm: '', swell: '', vertigo: '', hectic_fever: ''}});
	// } else {
	// 	const {matches, user_symptoms} = determineInitialDisease(agent.parameters);
	// 	for (i=0; i<user_symptoms.length; i++) {
	// 		default_symptoms[user_symptoms[i]] = true;
	// 	}
	// 	await db.updateUser(senderID, {symptoms: default_symptoms, diagnosis: {illness: 0, severity: 0}, group: {phlegm: '', swell: '', vertigo: '', hectic_fever: ''}});
	// 	util.triggerEvent(agent, 'EN-ASK-SYMPTOM');
	// }

	console.log('POSI')
	console.log(agent.parameters);

	agent.add('GOT IT');
};

const enShareSymptomNegative = async (agent) => {
	// const senderID = util.getSenderID(agent);

	// FIREASE

	// PUSH

	// RE GetAction
	// peform next move(move)

	console.log('NEGA');
	console.log(agent.parameters);

	agent.add('GOT IT');
};

const enShareFeeling = async (agent) => {
	// const senderID = util.getSenderID(agent);
	
	const temp = determineInitialDisease(agent.parameters)
	let fact = {
		user: {
			symptoms: temp.user_symptoms,
			old_symptoms: {},
			possible_diseases: {}
		},
		agent: agent
	}
	console.log('FEEELINGS');
	agent.add('GOT IT');
};

module.exports = {
	enShareSymptomPositive,
	enShareSymptomNegative,
	enShareFeeling,
};
