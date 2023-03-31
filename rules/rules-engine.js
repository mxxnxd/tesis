const {RuleEngine} = require('node-rules');
const rules_diagnose = require('./rules-diagnose'); 
const rules_symptom = require('./rules-symptom');

// Rule Engine
var R = new RuleEngine();
R.ignoreFactChanges = true;

// Ruleset
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

// CLI MODE Rules Engine
const main = async () => {
	const prompt = require("prompt-sync")({ sigint: '' });
	const db = require('../firebase/database.js'); // Database Manager

	var req = {
		user: {
			name: 'Steven Castro',
			language: 'ENGLISH',
			symptoms: {
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
			},
			diagnosis: {
				illness: '',
				severity: ''
			},
			group: {
				phlegm: '',
				hectic_fever: '',
				vertigo: '',
				swell: ''
			}
		},
		agent: {	
			next_action: ''
		},
		rules: await db.getDisease()
	};

	var memory = '';
	var auto = '';
	var n = auto.length;

	if (auto.length < 1) {
		while (req.user.diagnosis.illness === '') {
			var res = await getAction(req);
			req = res;

			var n = prompt(`${res.agent.next_action}: `);
			if (res.agent.next_action === 'EN.DIAGNOSE.UNABLE_TO_DIAGNOSE') { break; }
			var key = res.agent.next_action.split('-')[2].toLowerCase();

			// Input
			if (n === 'y') {
				res['user']['symptoms'][	key] = true;
				memory += 'y';
			} else if (n === 'n') {
				res['user']['symptoms'][key] = false;
				memory += 'n';
			} else {
				break;
			}

			console.log(`> STATUS: ${res.agent.status} | ${res.user.diagnosis.illness} | ${res.user.diagnosis.severity}`)
			req.agent.next_action = '';
		}
		console.log('===== ===== ===== ===== ===== ===== ===== ===== ===== =====')
		console.log(memory);
		console.log('===== ===== ===== ===== ===== ===== ===== ===== ===== =====')		
	} else {
		for (i = 0; i < n + 1; i++) {
			var res = await getAction(req);
			req = res;		

			console.log(`${res.agent.next_action}: ${auto[i]}`)
			if (res.agent.next_action === 'EN.DIAGNOSE.UNABLE_TO_DIAGNOSE') { break; }
			var key = res.agent.next_action.split('-')[2].toLowerCase();
			
			// Input
			if (auto[i] === 'y') {
				res['user']['symptoms'][key] = true;
				memory += 'y';
			} else if (auto[i] === 'n') {
				res['user']['symptoms'][key] = false;
				memory += 'n';
			} else {
				break;
			}

			console.log(`> STATUS: ${res.agent.status} | ${res.user.diagnosis.illness} | ${res.user.diagnosis.severity}`)
			req.agent.next_action = '';
		}
		console.log(`> STATUS: ${res.agent.status} | ${res.user.diagnosis.illness} | ${res.user.diagnosis.severity}`)
		console.log('===== ===== ===== ===== ===== ===== ===== ===== ===== =====')
		console.log(res.user.symptoms);
	}
};

// main();

// 'yynnyynnynynnnny'