const {RuleEngine} = require('node-rules');
const rules_ask = require('./rules-ask'); 
const rules_diagnose = require('./rules-diagnose'); 
const rules_symptom = require('./rules-symptom');

// Rule Engine
const R = new RuleEngine();

// Ruleset
rules_ask.applyRules(R);
rules_diagnose.applyRules(R);
rules_symptom.applyRules(R);

/*
	Determines the next agent action based on the user's current information
*/
const getAction = (fact) => {
	let new_fact = fact;
	return new Promise((resolve, reject) => {
		R.execute(fact, (data) => {
			new_fact = data;
			resolve(new_fact);
		});
	});
};

module.exports = {
	getAction
};

const main = async () => {
	let fact = {
		user: {
			name: 'Steven Castro',
			language: 'EN',
			symptoms: {
				abdomen_pain: null, 
				anxiety: null, 
				appetite_loss: null, 
				arm_pain: null, 
				back_pain: null, 
				belly_swell: null, 
				blurry: null, 
				bone_pain: null, 
				tachypnea: null, 
				chest_pain: false, 
				chest_tight: null, 
				chills: null, 
				colds: true, 
				confusion: null, 
				cough: true, 
				cyanosis: false, 
				dizzy: true, 
				dysphasia: null, 
				dyspnea: true, 
				faint: null, 
				fatigue: true, 
				fever: false, 
				headaches: false, 
				heartburn: null, 
				hoarseness: null, 
				legs_swell: null, 
				mouth_pain: null, 
				muscle_pain: null, 
				nausea: null, 
				neck_shoulder_pain: null, 
				neck_swell: null, 
				neck_tight: null, 
				pale_sweat: null, 
				phlegm_clear: false, 
				phlegm_green: null, 
				phlegm_red: null, 
				phlegm_white: null, 
				r_infections: null, 
				sleep_hard: null, 
				tachycardia: true, 
				urine_blood: null,
				weakness: null, 
				weightgain: null, 
				weightloss: null, 
				wheeze: true 
			},
			diagnosis: {
				illness: null,
				severity: null
			}
		},
		agent: {
			prev_action: null,	
			next_action: null
		},
		group: {
			phlegm: false
		}
	};

	let res = await getAction(fact);
	console.log(res);
};



main();