
const { Action, Disease, Symptom } = require('./class.js');

const fs = require('fs');

// get data from json file
const jsonData = fs.readFileSync('./fulfillment/disease-symptom.json', 'utf8');
const disease_symptom = JSON.parse(jsonData);



/* ===== ===== ===== ===== ===== ===== ===== */

const PRIORITY = 100;

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

// determine which disease to focus on after initial input
// const determineInitialDisease = (facts) => {
// 	const matches = [];
// 	const user_symptoms = facts.positive_symptoms;
// 	for (const {disease, symptom} of disease_symptom) {
// 		// uses every() so it wont recognize if user input is from different diseases 
// 		if (user_symptoms.every(temp => symptom.includes(temp.toLowerCase()))) { // we could change the json file to all caps, otherwise keep toLowerCase()
// 			matches.push(disease);
// 		}
// 	}
// 	//console.log('matches: ' + matches)
// 	return {matches, user_symptoms};
// }

// const prioritizeDiseasesRules = {
// 	id: 'priority',
// 	priority: PRIORITY + 50,
// 	condition: (R, facts) => {
// 		R.when(facts.user.start);	// when the initial input starts
// 	},
// 	consequence: (R, facts) => {
// 		const initial = determineInitialDisease(facts.user);
// 		console.log(initial)
// 		for (i = 0; i < initial.matches.length; i++) {
// 			R.prioritize(PRIORITY + 49 - i, {id: initial.matches[i]});
// 		}
// 		facts.user.start = false;
// 		R.stop();
// 		// R.next();
// 	}
// }

const recall_rule = {
	id: 'recall',
	priority: 200,
	condition: (R, facts) => {
		var previous_symptoms = facts.user.previous_symptoms;
		R.when(previous_symptoms.length != 0);
	},
	consequence: (R, facts) => { 
		var previous_symptoms = facts.user.previous_symptoms;
		var investigated_symptom = previous_symptoms.shift();

		facts.previous_symptoms = previous_symptoms;
		facts.agent.next_action = `RECALL-${investigated_symptom.toUpperCase()}`;

		R.stop();
	}
}

const setRecurringUserRules = () => {
	
}

const possibleDiseasesRules = [];
const diagnoseDiseasesRules = [];
// update facts next action
const setDiseasesRules = (R) => {

	for (let i = 0; i < disease_symptom.length; i++) {
		let id = disease_symptom[i].disease;
		let symptoms = disease_symptom[i].symptom;

		const disease_rule = {
			id,
			priority: PRIORITY - i,
			condition: (R, facts) => {

				// console.log(`TEST-${id}`);
				var symptom_rules = symptoms;
				var positive = 0, negative = 0;
				var threshold = symptom_rules.length / 2;
				var hasAction = false;

				var positive_symptoms = facts.user.positive_symptoms; 
				var negative_symptoms = facts.user.negative_symptoms;  

				// Check Symptoms
				for (i = 0; i < symptom_rules.length; i++) {
					var investigated_symptom = symptom_rules[i];

					if (hasAction) {
						break;
					}

					if (positive >= threshold || negative >= threshold + 1) {
						console.log(`${positive} < ${threshold} || ${negative} >= ${threshold + 1} `)
						break;
					} else if (positive_symptoms.includes(investigated_symptom)) { 
						positive++;
					} else if (negative_symptoms.includes(investigated_symptom)) {
						negative++;
					} else {
						facts.agent.next_action = `ASK-${investigated_symptom.toUpperCase()}`;
						hasAction = true;
						R.stop();
					}
				}
				R.when(positive >= threshold);
			},
			consequence: (R, facts) => {
				facts.agent.next_action = `DIAGNOSE-${id.toUpperCase()}`;
				R.stop();
			}
		}

		R.register(disease_rule);
	}
}

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
	id: "diagnoseCOPD",
	priority: PRIORITY - 50,
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
	id: 'hasAction',
	priority: 2,
	condition: (R, facts) => {
		console.log(facts.agent.next_action);
		R.when(facts.agent.next_action);
	},
	consequence: (R, facts) => {	
		R.stop();
	}	
}

const diagnoseNone = {
	id: "diagnoseNone",
	priority: 1,
	condition: (R, facts) => {
		R.when(Object.keys(facts.user.possible_diseases).length == 0);
	},
	consequence: (R, facts) => {
		facts.agent.next_action = 'NO-DIAGNOSIS';
		R.stop();
	}
};

const applyRules = (R) => {
	//R.register(prioritizeDiseasesRules);
	R.register(recall_rule);
	setDiseasesRules(R);

	//R.register(diagnoseCOPD);
	R.register(hasAction);
	R.register(diagnoseNone);
};

module.exports = {
	applyRules
};

function checkAllSymptoms(facts, disease) {
	if (!checkSymptoms(facts, disease)) {
		return false;
	}
	console.log('Key Symptoms: PASSED');

	return true;
}

function checkSymptoms(facts, disease) {
	const current_symptoms = facts.user.symptoms;
	const disease_symptoms = facts.agent.questions[disease];

	// Check symptoms of this category
	const category_symptoms = disease_symptoms;
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