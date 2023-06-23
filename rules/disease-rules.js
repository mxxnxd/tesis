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


const phlegm_rule = {
	id: 'phlegm',
	priority: PRIORITY + 50, // 150
	condition: (R, facts) => {
		console.log(facts.user.group.phlegmNeeded)
		if (facts.user.group.phlegmNeeded) {
			console.log('phlegm_rule - condition - phlegm is needed')
			disease = disease_symptom.find(disease => disease.disease === facts.agent.currentDisease);
			phlegms = disease.symptom.filter(symptom => symptom.startsWith('phlegm_'));
			var hasAction = false;
			for (i = 0; i < phlegms.length; i++) {
				if (hasAction) {
					console.log('phlegm_rule - condition - breakloop')
					break;
				}
				if (!facts.user.positive_symptoms.includes(phlegms[i]) && !facts.user.negative_symptoms.includes(phlegms[i])) {
					facts.agent.next_action = `ASK-${phlegms[i].toUpperCase()}`;
					hasAction = true;
					R.stop()
				}
			}
			if (!hasAction) {
				facts.user.group.phlegmNeeded = false;
			}
		}
		R.when(facts.user.group.phlegmNeeded && !hasAction);
	},
	consequence: (R, facts) => {
		facts.user.group.phlegmNeeded = false;
		if (facts.user.positive_symptoms.length >= facts.agent.threshold || facts.user.negative_symptoms.length >= facts.agent.threshold + 1) {
			facts.agent.next_action = `DIAGNOSE-${facts.agent.currentDisease.toUpperCase()}`;
		}
		R.stop();
	}

}
// still not done
const weight_rule = {
	id: 'weight',
	priority: PRIORITY + 49, // 150
	condition: (R, facts) => {
		console.log('weight needed = ' + facts.agent.weightNeeded)
		var hasAction = false;
		if (facts.agent.weightNeeded) {
			console.log('weight_rule - condition - weight is needed')
			facts.agent.next_action = `ASK-WEIGHT`;
			hasAction = true;
		}
		if (!hasAction) {
			facts.agent.weightNeeded = false;
		}

		R.when(facts.agent.weightNeeded);
	},
	consequence: (R, facts) => {
		facts.agent.weightNeeded = false;
		if (facts.user.positive_symptoms.length >= facts.agent.threshold || facts.user.negative_symptoms.length >= facts.agent.threshold + 1) {
			facts.agent.next_action = `DIAGNOSE-${facts.agent.currentDisease.toUpperCase()}`;
		}
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
					let symptom = symptoms[j];
					if (hasAction) {
						console.log('registerDiseaseRules - condition - break loop')
						break;
					}
					if (!facts.user.positive_symptoms.includes(symptom) && !facts.user.negative_symptoms.includes(symptom)) {
						if (symptom.startsWith('phlegm')) {
							var phlegms = symptoms.filter(symptom => symptom.startsWith('phlegm_'));
							facts.agent.threshold = (symptoms.length - phlegms.length - 1) / 2;
							
							if (!facts.agent.initialPhlegmActionDone) {
								facts.agent.next_action = `ASK-PHLEGM`;
								facts.agent.initialPhlegmActionDone = true;
								hasAction = true;
								R.stop();
							} else {
								if (facts.user.group.phlegmNeeded) {
									console.log(`registerDiseaseRules - condition - ${symptom} --- proceed to restart`)
									facts.user.group.phlegmNeeded = true;
									facts.agent.needsRestart = true;
									hasAction = true;
								}
								else {
									continue;
								}
							}
						} else if (symptom.startsWith('weight')) {	// still not done
							if (!facts.agent.initialWeightActionDone) {
								facts.agent.next_action = `ASK-${symptom.toUpperCase()}`;
								facts.agent.initialWeightActionDone = true;
								hasAction = true;
								R.stop();
							} else {
								console.log(`registerDiseaseRules - condition - ${symptom} --- proceed to restart`)
								facts.agent.needsRestart = true;
								facts.agent.weightNeeded = true;
								hasAction = true;
							}
						} else {
							console.log(`registerDiseaseRules - condition - ${symptom} is not in positive/negative symptoms`)
							hasAction = true;
							facts.agent.next_action = `ASK-${symptom.toUpperCase()}`;
							R.stop()
						}
					}
				}
				R.when(hasAction)
			},
			consequence: (R, facts) => {
				if (facts.agent.needsRestart){
					facts.agent.needsRestart = false;
					console.log('restart')
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
		var investigated_symptom = previous_symptoms.shift();
		facts.previous_symptoms = previous_symptoms;

		if (investigated_symptom === `r_infections`) {
			facts.user.positive_symptoms.push(investigated_symptom);
			investigated_symptom = previous_symptoms.shift();
			facts.previous_symptoms = previous_symptoms;
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
		console.log('in condition')
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

const applyRules = (R) => {
	//R.register(prioritizeDiseasesRules);
	R.register(recallSymptoms);
	R.register(hasAction);
	R.register(diagnoseNone);
	registerDiseaseRules(R);
	R.register(pneumoniaSeverityRule);
	R.register(phlegm_rule);
	R.register(weight_rule);
};

module.exports = {
	applyRules
};