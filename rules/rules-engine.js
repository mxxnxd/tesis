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
			language: 'FI',
			symptoms: {
				abdomen_pain: true,
				anxiety: true,
				appetite_loss: null,
				blurry: false,
				bone_pain: null,
				breath_rapid: null,
				breath_short: null,
				chest_pain: null,
				chest_tight: null,
				chills: null,
				colds: null,
				colds_long: null,
				confusion: null,
				cough: null,
				cough_blood: false,
				cough_hard: true,
				cough_long: null,
				cyanosis: null,
				dizzy: null,
				faint: null,
				fatigue: null,
				fever: null,
				fever_high: null,
				headaches: null,
				heart_rapid: null,
				heartburn: null,
				hoarseness: null,
				muscle_pain: null,
				nausea: null,
				neck_tight: null,
				pain_arm: null,
				pain_back: null,
				pain_belly: null,
				pain_jaw: null,
				pain_neck: null,
				pain_shoulder: null,
				pain_teeth: null,
				pain_throat: null,
				pale: null,
				phlegm_clear: true,
				phlegm_green: null,
				phlegm_red: null,
				phlegm_white: null,
				phlegm_yellow: null,
				r_infections: null,
				sleep_hard: null,
				smoking: null,
				swallow_hard: null,
				sweating_cold: null,
				swell_ankle: null,
				swell_belly: true,
				swell_feet: null,
				swell_legs: null,
				swell_neck: null,
				throat_clear: null,
				urine_blood: null,
				weakness: null,
				weightgain: null,
				weightloss: null,
				wheeze: null,
				wheeze_hard: false,
			}
		},
		agent: {
			prev_action: null,	
			next_action: null
		},
		temp: {
			phlegm: null,
			swell_upper: null,
			swell_lower: null,
			swell: null
		}
	};

	let res = await getAction(fact);
	console.log(res.agent);
};



main();