
// Libraries
const { RuleEngine } = require('node-rules');

const { Symptom, Action, Disease } = require('./class.js');

// Rules definition
const diseasesRuleset = require('./disease-rules.js');

// Rules Engine
var R = new RuleEngine();
R.ignoreFactChanges = true;

// Apply rules
diseasesRuleset.applyRules(R);

/*
	Updates facts with the next agent action based on current facts.
*/
const getAction = (inputFacts) => {
	const facts = inputFacts;
	return new Promise((resolve, reject) => {
		R.execute(facts, (data) => {
			resolve(data);
		});
	});
};

module.exports = {
	getAction
};

var facts = {
	user: {
		symptoms: {
			// chest_pain: false,
			cough: new Symptom('BOOL', 0.1)
			// dyspnea: false,
			// wheeze: false,
			// phelgm: true
		},
		possible_diseases: {}
	},
	agent: {}
};

const main = async (questions) => {
	facts.agent['questions'] = questions;

	const prompt = require("prompt-sync")({ sigint: '' });

	console.log(await getAction(facts));

	// while (true) {
	// 	delete facts.agent.next_action;
	// 	// console.log(checkAllSymptoms(facts, 'asthma'));
	// 	checkAllSymptoms(facts, 'asthma')
	// 	let action = facts.agent.next_action;

	// 	if (action === undefined) {
	// 		break;
	// 	}
	// 	console.log(action.string());
		
	// 	let input = prompt(`>:`).toLowerCase();

	// 	if (input === 'x') {
	// 		break;
	// 	} else {
	// 		facts.user.symptoms[action.topic.toLowerCase()] = new Symptom(action.subtopic, parseFloat(input)); 
	// 	}
	// 	// console.log(facts.user.symptoms);	
	// }
	// console.log(facts);
};

const questions = {
	copd: {
		keys: {
			cough: new Symptom('RATE'),
			phelgm: new Symptom('RATE'),
			chest_tightness: new Symptom('RATE'),
			tachypnea: new Symptom('RATE'),
			dyspnea: new Symptom('RATE'),
			confidence: new Symptom('RATE'),
			sleep: new Symptom('RATE'),
			fatigue: new Symptom('RATE'),			
		},
		additional: {
			dysphasia: new Symptom('BOOL'),
			legs_edema: new Symptom('BOOL'),
			weightloss: new Symptom('BOOL'),
			colds: new Symptom('BOOL'),
			wheeze: new Symptom('BOOL')		
		},
		severe: {
			cyanosis: new Symptom('BOOL'),
			dizzy: new Symptom('BOOL'),
			fever: new Symptom('BOOL'),
			confusion: new Symptom('BOOL'),
			tachycardia: new Symptom('BOOL')
		},
		history: {}
	},
	asthma: {
		keys: {
			chest_tightness: new Symptom('BOOL'), 
			tachypnea: new Symptom('RATE'),
			dyspnea: new Symptom('RATE'),
			wheeze: new Symptom('RATE'),
			wake: new Symptom('RATE'),
			sleep: new Symptom('RATE')
		},
		additional: {
			colds: new Symptom('BOOL'),
			headaches: new Symptom('BOOL'),
			fatigue: new Symptom('BOOL')
		},
		severe: {
			anxiety: new Symptom('BOOL'),
			sweaty: new Symptom('BOOL'),
			cyanosis: new Symptom('BOOL'),
			tachypnea: new Symptom('BOOL'),
			neck_tightness: new Symptom('BOOL')
		},
		history: {
			brocholidator: new Symptom('RATE')
		},
	},
	pneumonia: {
		keys: {
			chest_tightness: new Symptom('BOOL'),
			cough: new Symptom('BOOL'),
			phlegm: new Symptom('BOOL'),
			confusion: new Symptom('BOOL'),
			tachypnea: new Symptom('BOOL'),
			fever: new Symptom('BOOL'),
			tachycardia: new Symptom('BOOL')
		},
		additional: {
			fatigue: new Symptom('BOOL'),
			dyspnea: new Symptom('BOOL'),
			colds: new Symptom('BOOL'),
			nausea: new Symptom('BOOL'),
			wheeze: new Symptom('BOOL')
		},
		severe: {
			fever: new Symptom('BOOL'),
			chest_tightness: new Symptom('BOOL'),
			colds: new Symptom('BOOL'),
			weakness: new Symptom('BOOL')
		},
		history: {
			age: new Symptom('NUM'),
			sex: new Symptom('SEX'),
			nursing_home_resident: new Symptom('BOOL'),
			liver_disease: new Symptom('BOOL'),
			congestive_heart_failure: new Symptom('BOOL'),
			renal_disease: new Symptom('BOOL'),
			neoplastic_disease:  new Symptom('BOOL')
		}
	},	
	template: {
		keys: {},
		additional: {},
		severe: {},
		history: {}
	}
}

main(questions);

function checkAllSymptoms(facts, disease) {
	if (!checkSymptoms(facts, disease, 'keys')) {
		return false;
	}
	// console.log('Key Symptoms: PASSED');

	if (!checkSymptoms(facts, disease, 'additional')) {
		return false;
	}
	// console.log('Additional Symptoms: PASSED');

	if (!checkSymptoms(facts, disease, 'severe')) {
		return false;
	}

	if (!checkSymptoms(facts, disease, 'history')) {
		return false;
	}
	
	return true;
}

function checkSymptoms(facts, disease, category) {
	const current_symptoms = facts.user.symptoms;
	const disease_symptoms = facts.agent.questions[disease];

	// Check symptoms of this category
	const category_symptoms = Object.keys(disease_symptoms[category]);
	var false_key_symptoms = 0;
	var threshhold = 4; 								// Atleast n symptoms, fetched from KB
	var length = category_symptoms.length;
						
	for (i = 0; i <  length; i++) {
		let symptom = category_symptoms[i];
		
		if (current_symptoms[symptom] === undefined) { 	// User has not determined this symptom. 					
			facts.agent.next_action = new Action('ASK', symptom.toUpperCase(), disease_symptoms[category][symptom].type, 'INIT');
			return false;

		} else if (current_symptoms[symptom].value) {	// User has determined this symptom to be True.					
			let current_type = current_symptoms[symptom].type;
			let disease_type = disease_symptoms[category][symptom].type;

			if (current_type !== disease_type && disease_type === 'RATE') {
				facts.agent.next_action = new Action('ASK', symptom.toUpperCase(), disease_type, 'REDO');
				return false;
			} 
		} else { 										// User has determined this symptom to be False.
			false_key_symptoms++;

			// Threshold to Pass?						// Find a Threshold
			if (length - threshhold <= false_key_symptoms) {
				return false;
			}
		}															
	}
	return true;
}	