const fs = require('fs');

// Parse Symptom-Disease 
const jsonData = fs.readFileSync('../fulfillment/disease-symptom.json', 'utf8');
const disease_symptom = JSON.parse(jsonData);

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

const applyRules = (R) => {
	//R.register(prioritizeDiseasesRules);
	R.register(recallSymptoms);
	R.register(hasAction);
	R.register(diagnoseNone);
	registerDiseaseRules(R);
};

module.exports = {
	applyRules
};