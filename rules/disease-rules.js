
const { Action, Disease, Symptom } = require('./class.js');




/* ===== ===== ===== ===== ===== ===== ===== */

const PRIORITY = 50;

// const COPD = 'COPD';
const ASTHMA = 'ASTHMA';
const PNEUMONIA = 'PNEUMONIA';
const LUNG_CANCER = 'LUNG_CANCER';
const TUBERCULOSIS = 'TUBERCULOSIS';

const HEARTFAILURE = 'HEART_FAILURE';
const HYPERTENSION = 'HYPERTENSION';
const CAD = 'CAD';
const ARRHYTHMIA = 'ARRHYTHMIA';
const CARDIOMYOPATHY = 'CARDIOMYOPATHY'
const VALVEDISEASE = 'VALVE_DISEASE';
const MYOCARDIALIN_FARCTION = 'MYOCARDIAL_INFARCTION';
const ANEURYSM = 'ANEURYSM';

/* ===== ===== ===== ===== ===== ===== ===== */

const diseases = [];

const COPD = new Disease('COPD', ['chest_pain', 'dyspnea', 'wheeze', 'phlegm']);
diseases.push(COPD);

/* ===== ===== ===== ===== ===== ===== ===== */

// Update facts w/ possible diseases based on current symptoms.
const determinePossibleDiseases = {
	priority: PRIORITY + 10,
	condition: (R, facts) => {
		R.when(true);
	},
	consequence: (R, facts) => {
		diseases.forEach(disease => {
			for (i = 0; i < disease.symptoms.length; i++) {
				const current_symptom = facts.user.symptoms[disease.symptoms[i]];
				if (current_symptom || current_symptom === undefined) {
					facts.user.possible_diseases[disease.name] = true;
				} else {
					delete facts.user.possible_diseases[disease.name];
					break;
				}
			}
		});
		R.next();
	}
};

// Chronic Obstructive Pulmonary Disease
const diagnoseCOPD = {
	priority: PRIORITY,
	condition: (R, facts) => {
		// Check possbile disease
		// if (facts.user.possible_diseases['COPD']) {
		R.when(checkAllSymptoms(facts, 'copd'));
		// }
		R.when(false);
	},
	consequence: (R, facts) => {
		R.stop();
	}
};

const hasAction = {
	priority: 2,
	condition: (R, facts) => {
		R.when(facts.agent.next_action);
	},
	consequence: (R, facts) => {	
		R.stop();
	}	
}

const diagnoseNone = {
	priority: 1,
	condition: (R, facts) => {
		R.when(Object.keys(facts.user.possible_diseases).length == 0);
	},
	consequence: (R, facts) => {
		facts.agent['next_action'] = 'NO-DIAGNOSIS';
		R.stop();
	}
};

const applyRules = (R) => {
	// R.register(determinePossibleDiseases);
	R.register(diagnoseCOPD);
	R.register(hasAction);
	R.register(diagnoseNone);
};

module.exports = {
	applyRules
};

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