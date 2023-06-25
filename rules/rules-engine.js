
// Libraries
const { RuleEngine } = require('node-rules');
const fs = require('fs');

// Rules definition
const diseasesRuleset = require('./disease-rules.js');

// Rules Engine
var R = new RuleEngine();
R.ignoreFactChanges = false;

// Apply rules
diseasesRuleset.applyRules(R);

/*
	Updates facts with the next agent action based on current facts.
*/
const getAction = (inputFacts) => {
	const facts = inputFacts;

	// First Run (Reorders Rules)
	if (facts.user.start) {
		const PRIORITY = 100;
		const initial = determineInitialDisease(facts.user);
		
		for (i = 0; i < initial.matches.length; i++) {
			R.prioritize(PRIORITY + 49 - i, {id: initial.matches[i]});
		}
		console.log('> Rules Reordered...');
		facts.user.start = false;
	}

	return new Promise((resolve, reject) => {
		R.execute(facts, (data) => {
			resolve(data);
		});
	});
};

module.exports = {
	getAction
};

// Determine which disease to focus on after initial input
const determineInitialDisease = (facts) => {
	const jsonData = fs.readFileSync('./fulfillment/disease-symptom.json', 'utf8');
	const disease_symptom = JSON.parse(jsonData);

	const matches = [];
	const user_symptoms = facts.positive_symptoms;
	for (const {disease, symptom} of disease_symptom) {
		// uses every() so it wont recognize if user input is from different diseases
		if (user_symptoms.every(temp => symptom.includes(temp.toLowerCase()))) { // we could change the json file to all caps, otherwise keep toLowerCase()
			matches.push(disease);
		}
	}
	//console.log('matches: ' + matches)
	return {matches, user_symptoms};
}

// Testing
const main = async () => {
	// console.log(R.activeRules)
	var facts = {
		user: {
			positive_symptoms: ['fatigue', 'dyspnea'],
			negative_symptoms: [],
			previous_symptoms: [],
			severity: {
				weight: 0,
			},
			start: true,
		},
		agent: {
			flags: {
				ask_phlegm: 0,
				ask_weight: 0,
			},
			currentDisease: '',
			needsRestart: false,
			group: {
				phlegms: []
			},
			initialPhlegmActionDone: false,
			phlegmNeeded: false,
			currentPhlegmCount: 0,
			weightNeeded: false
		}
	};
	

	if (facts.user.previous_symptoms.length === 0) {
		facts.user.start = true;
	}

	var prompter = require("prompt-sync")({ sigint: '' });
	while (true) {
		var output = await getAction(facts);
		console.log(output.agent.next_action);

		if (output.agent.next_action === undefined) {
			console.log('Err');
			break;
		} else if (output.agent.next_action.startsWith('DIAGNOSE')) {
			console.log('End');
		}

		var input = prompter(`>:`).toLowerCase();

		if (input === 'y') {
			output.user.positive_symptoms.push(output.agent.next_action.split('-')[1].toLowerCase());
		} else if (input === 'n') {
			output.user.negative_symptoms.push(output.agent.next_action.split('-')[1].toLowerCase());
		} else {
			if (output.agent.next_action === 'ASK-WEIGHT') {
				output.user.severity.weight = input;
			} else {
				console.log('Exit');
				break;
			}
			
		}

		facts = output;
		// console.log(facts.user);
	}
};

main();
