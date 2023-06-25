const fs = require('fs');

// Parse Symptom-Disease 
const disease_symptom_json = fs.readFileSync('./fulfillment/disease-symptom.json', 'utf8');
const disease_symptom = JSON.parse(disease_symptom_json);

// Parse Symptom-Disease 
const disease_severity_json = fs.readFileSync('./rules/severity.json', 'utf8');
const disease_severity = JSON.parse(disease_severity_json);
/* ===== ===== ===== ===== ===== ===== ===== */

const PRIORITY = 100;
/* ===== ===== ===== ===== ===== ===== ===== */

const clean_facts = {
	id: 'clean',
	priority: PRIORITY + 100, // 200
	condition: (R, facts) => {
		R.when(true);
	},
	consequence: (R, facts) => {
		if (!facts.user.positive_symptoms) {
			facts.user.positive_symptoms = [];
		}
		if (!facts.user.negative_symptoms) {
			facts.user.negative_symptoms = [];
		}		
		if (!facts.user.previous_symptoms) {
			facts.user.previous_symptoms = [];
		}
		if (!facts.user.severity) {
			facts.user.severity = {};
			if (!facts.user.severity.final) {
				facts.user.severity.final = '';
			}
			if (!facts.user.severity.score) {
				facts.user.severity.score = 0;
			}
			if (!facts.user.severity.confusion) {
				facts.user.severity.confusion = false;
			}
			if (!facts.user.severity.urea) {
				facts.user.severity.urea = 0;
			}
			if (!facts.user.severity.respiratoryRate) {
				facts.user.severity.respiratoryRate = 0;
			}
			if (!facts.user.severity.weight) {
				facts.user.severity.weight = 0;
			}
			if (!facts.user.severity.age) {
				facts.user.severity.age = 0;
			}
			if (!facts.user.severity.bloodPressure) {
				facts.user.severity.bloodPressure = [];
			}

		}
		if (!facts.agent.currentDisease) {
			facts.agent.currentDisease = '';
		}
		if (!facts.agent.needsRestart) {
			facts.agent.needsRestart = false;
		}
		if (!facts.agent.initialPhlegmActionDone) {
			facts.agent.initialPhlegmActionDone = false;
		}
		if (!facts.agent.currentPhlegmCount) {
			facts.agent.currentPhlegmCount = false;
		}
		if (!facts.agent.currentPhlegmCount) {
			facts.agent.currentPhlegmCount = 0;
		}
		if (!facts.agent.weightNeeded) {
			facts.agent.weightNeeded = false;
		}
		if (!facts.agent.group) {
			facts.agent.group = {}
			if (!facts.agent.group.phlegms) {
				facts.agent.group.phlegms = [];
			}
		}
		/*
			I recommend refactoring these fields under a subfield of Agent,
			so you could just check one field instead of every one of them.
			This is only applicable since all of the fields are new and not used on old setups.
			
			if (!facts.agent.TEMP_NAME) {
				facts.agent.TEMP_NAME = {
					phlegmNeeded = false,
					group: {
						phlegms: []
					},
					etc...
				}
			}
		*/
		
		// if (!facts.agent.phlegmNeeded) {
		// 	facts.agent.phlegmNeeded = false;
		// }
		// if (!facts.agent.group) {
		// 	facts.agent.phlegmNeeded = {
		// 		phlegms: []
		// 	}
		// }

		// currentDisease: '',
		// needsRestart: false,
		// group: {
		// 	phlegms: []
		// },
		// initialPhlegmActionDone: false,
		// phlegmNeeded: false,
		// currentPhlegmCount: 0,
		// weightNeeded: false

		R.next();
	}
};

const filter_negative_symptoms = {
	id: 'filter_negative_symptoms',
	priority: PRIORITY + 51, // 149,
	condition: (R, facts) => {
		var negative_symptoms = facts.user.negative_symptoms.filter(symptom => symptom.startsWith('phlegm_'));
		console.log(negative_symptoms)
		R.when(negative_symptoms.length > 0);
	},
	consequence: (R, facts) => {
		var negative_symptoms = facts.user.negative_symptoms
		for (i = negative_symptoms.length - 1; i >= 0; i--) {
			if (negative_symptoms[i].startsWith('phlegm_')) {
				facts.agent.group.phlegms.push(negative_symptoms[i]);
				facts.user.negative_symptoms.splice(i, 1);
			}
		}
		if (facts.agent.group.phlegms === facts.agent.currentPhlegmCount) {
			facts.user.negative_symptoms.push('phlegms');
		}
		R.next();
	}
}

const phlegm_rule = {
	id: 'phlegm',
	priority: PRIORITY + 50, // 150
	condition: (R, facts) => {
		var hasAction = false;
		if (facts.agent.phlegmNeeded) {
			// get all symptoms that starts with `phlegm_`
			disease = disease_symptom.find(disease => disease.disease === facts.agent.currentDisease);
			phlegms = disease.symptom.filter(symptom => symptom.startsWith('phlegm_'));
			facts.agent.currentPhlegmCount = phlegms.length;
			for (i = 0; i < phlegms.length; i++) { // get action for each of the phlegm color
				if (hasAction) {
					break;
				}
				if (!facts.user.positive_symptoms.includes(phlegms[i]) && !facts.agent.group.phlegms.includes(phlegms[i])) {
					facts.agent.next_action = `ASK-${phlegms[i].toUpperCase()}`;
					hasAction = true;
					R.stop()
				}
			}
			if (!hasAction) {
				facts.agent.phlegmNeeded = false;
			}
		}
		R.when(facts.agent.phlegmNeeded && !hasAction);
	},
	consequence: (R, facts) => {
		facts.agent.phlegmNeeded = false;
		facts.agent.group.phlegms = [];
		if (facts.user.positive_symptoms.length >= facts.agent.threshold || facts.user.negative_symptoms.length >= facts.agent.threshold + 1) {
			facts.agent.next_action = `DIAGNOSE-${facts.agent.currentDisease.toUpperCase()}`;
		}
		R.stop();
	}

}

const weight_rule = {
	id: 'weight',
	priority: PRIORITY + 48, // 148
	condition: (R, facts) => {
		var present = facts.user.positive_symptoms.includes('weightgain') || facts.user.positive_symptoms.includes('weightloss');
		R.when(present && facts.agent.weightNeeded);
	},
	consequence: (R, facts) => {
		facts.agent.next_action = `ASK-WEIGHT`;
		facts.agent.weightNeeded = false;
		R.stop();
	}
}

const registerDiseaseRules = (R) => {
	for (let i = 0; i < disease_symptom.length; i++) {
		let id = disease_symptom[i].disease;
		let symptoms = disease_symptom[i].symptom;

		const disease_rule = {
			id,
			priority: PRIORITY - i,	// 99 - down
			condition: (R, facts) => {
				facts.agent.threshold = symptoms.length / 2;
				facts.agent.currentDisease = id;
				var hasAction = false;
				for (j = 0; j < symptoms.length; j++) {
					let investigated_symptom = symptoms[j];
					if (hasAction) {
						break;
					}
					if (!facts.user.positive_symptoms.includes(investigated_symptom) && !facts.user.negative_symptoms.includes(investigated_symptom)) { // if symptom is not in 
						if (investigated_symptom.startsWith('phlegm')) {
							var phlegms = symptoms.filter(symptom => symptom.startsWith('phlegm_'));
							facts.agent.threshold = (symptoms.length - phlegms.length - 1) / 2;
							
							if (!facts.agent.initialPhlegmActionDone) { // flag to trigger initial phlegm question
								facts.agent.next_action = `ASK-PHLEGM`;
								facts.agent.initialPhlegmActionDone = true;
								hasAction = true;
								R.stop();
							} else {
								if (facts.agent.phlegmNeeded) { // trigger R.restart()
									facts.agent.phlegmNeeded = true;
									facts.agent.needsRestart = true;
									hasAction = true;
								}
								else {
									continue;
								}
							}
						} else {
							hasAction = true;
							facts.agent.next_action = `ASK-${investigated_symptom.toUpperCase()}`;
							R.stop()
						}
					}
				}
				R.when(hasAction)
			},
			consequence: (R, facts) => {
				if (facts.agent.needsRestart){	// restart rule engine
					facts.agent.needsRestart = false;
					R.restart();
				} else {
					if (facts.user.positive_symptoms.length >= facts.agent.threshold || facts.user.negative_symptoms.length >= facts.agent.threshold + 1) {
						console.log(`${facts.user.positive_symptoms.length} >= ${facts.agent.threshold} || ${facts.user.negative_symptoms.length} >= ${facts.agent.threshold + 1}`)
						facts.agent.next_action = `DIAGNOSE-${id.toUpperCase()}`;
					}
					R.stop();
				}
		  
			}
		}

		R.register(disease_rule);
	}
}

const recallSymptoms = {
	id: 'recall',
	priority: 200,
	condition: (R, facts) => {
		var previous_symptoms = facts.user.previous_symptoms;
		R.when(previous_symptoms.length != 0);
	},
	consequence: (R, facts) => { 
		var previous_symptoms = facts.user.previous_symptoms;

		while (facts.previous_symptoms.length != 0) {
			var investigated_symptom = previous_symptoms.shift();
			facts.previous_symptoms = previous_symptoms;

			if (investigated_symptom === `r_infections`) {
				facts.user.positive_symptoms.push(investigated_symptom);
			} 
			
			if (!facts.user.positive_symptoms.includes(investigated_symptom)) {
				break;
			}
		}

		facts.agent.next_action = `RECALL-${investigated_symptom.toUpperCase()}`;
		R.stop();
	}
}

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

const pneumoniaSeverityRule = {
	id: 'pneumonia_severity',
	priority: PRIORITY - 50, // 50 // change?
	condition: (R, facts) => {
		var hasAction = false;
		const disease = disease_severity.find(data => data.disease === "pneumonia");

		var positive_symptoms = facts.user.positive_symptoms; 
		var negative_symptoms = facts.user.negative_symptoms;  

		// check if the criteria is in positive_symptoms/negative_symptoms and update facts
		var symptom = disease.criteria[0];
		if (positive_symptoms.includes(symptom)) {
			facts.user.severity[symptom] = true;
		} else if (negative_symptoms.includes(symptom)) {
			facts.user.severity[symptom] = false;
		}

		for (i = 0; i < disease.criteria.length; i++) {
			var investigated_criteria = disease.criteria[i];

			if (hasAction) {
				break;
			}

			if (!facts.user.severity[investigated_criteria]) {
				facts.agent.next_action = `SEVERITY-${disease.disease.toUpperCase()}-ASK-${investigated_criteria.toUpperCase()}`;
				hasAction = true;
				R.stop();
			}
		}
		// If all the criteria is not undefined
		R.when(facts.user.severity.confusion && facts.user.severity.urea && 
			facts.user.severity.respiratoryRate && facts.user.severity.bloodPressure && 
			facts.user.severity.age);
	},
	consequence: (R, facts) => {
		const { confusion, urea, respiratoryRate, bloodPressure, age } = facts.user.severity;
		facts.user.severity.score = 0;
		// calculate the score
		if (confusion) {
			facts.user.severity.score += 1;
		}
		if (urea > 7) {
			facts.user.severity.score += 1;
		}
		if (respiratoryRate >= 30) {
			facts.user.severity.score += 1;
		}
		if (bloodPressure[0] < 90 && bloodPressure[1] <= 60) {
			facts.user.severity.score += 1;
		}
		if (age >= 65) {
			facts.user.severity.score += 1;
		}

		if (facts.user.severity.score <= 1) { // Low severity, suitable for home treatment.
			facts.user.severity.final = 'LOW';
		} else if (facts.user.severity.score === 2) { // Moderate severity, consider hospitalization.
			facts.user.severity.final = 'MODERATE';
		} else if (facts.user.severity.score >= 3) { // Severe, hospitalization is often required.
			facts.user.severity.final = 'SEVERE';
		}

		R.stop();
	}
}

const hypertensionSeverityRule = {
	id: 'hypertension_severity',
	priority: PRIORITY - 51, // 50 // change?
	condition: (R, facts) => {
		var hasAction = false;
		const disease = disease_severity.find(data => data.disease === "hypertension");

		for (i = 0; i < disease.criteria.length; i++) {
			var investigated_criteria = disease.criteria[i];

			if (hasAction) {
				break;
			}

			if (!facts.user.severity[investigated_criteria]) {
				facts.agent.next_action = `SEVERITY-${disease.disease.toUpperCase()}-ASK-${investigated_criteria.toUpperCase()}`;
				hasAction = true;
				R.stop();
			}
		}
		// If all the criteria is not undefined
		R.when(facts.user.severity.bloodPressure);
	},
	consequence: (R, facts) => {
		const { bloodPressure } = facts.user.severity;

		if (bloodPressure[0] < 90 && bloodPressure[1] <= 60) {
			facts.user.severity.final = 'NORMAL';
		} else if (bloodPressure[0] < 120 && bloodPressure[1] < 80) {
			facts.user.severity.final = 'ELEVATED';
		} else if ((bloodPressure[0] >= 120 && bloodPressure[0] <= 129) && bloodPressure[1] < 80) {
			facts.user.severity.final = 'STAGE_1';
		} else if ((bloodPressure[0] >= 130 && bloodPressure[0] <= 139) && (bloodPressure[0] >= 80 && bloodPressure[0] <= 89)) {
			facts.user.severity.final = 'STAGE_2';
		} else if (bloodPressure[0] > 180 && bloodPressure[1] <= 120) {
			facts.user.severity.final = 'HYPERTENSIVE_CRISIS';
		}

		R.stop();
	}
}

const applyRules = (R) => {
	R.register(clean_facts);
	R.register(filter_negative_symptoms);
	R.register(phlegm_rule);
	R.register(weight_rule);
	registerDiseaseRules(R);
	R.register(recallSymptoms);
	R.register(pneumoniaSeverityRule);
	R.register(hypertensionSeverityRule);
	R.register(hasAction);
	R.register(diagnoseNone);
};

module.exports = {
	applyRules
};