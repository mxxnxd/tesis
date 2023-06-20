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

const registerDiseaseRules = (R) => {
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
				var includedSymptoms = 0;

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
	priority: 50, // change?
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
};

module.exports = {
	applyRules
};