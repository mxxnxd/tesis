
// Libraries
const { RuleEngine } = require('node-rules');

const { Symptom, Action, Disease } = require('./class.js');

// Rules definition
const diseasesRuleset = require('./disease-rules.js');

// Rules Engine
var R = new RuleEngine();
R.ignoreFactChanges = true;

// Apply rules
diseasesRuleset.applyRules(R);


/*
	Updates facts with the next agent action based on current facts.
*/
const getAction = (inputFacts) => {
	const facts = inputFacts;
	return new Promise((resolve, reject) => {
		R.execute(facts, (data) => {
			resolve(data);
		});
	});
};

module.exports = {
	getAction
};


const fs = require('fs');
const { getUserState, setUserState } = require('../firebase/state.js');
// get data from json file
const jsonData = fs.readFileSync('./fulfillment/disease-symptom.json', 'utf8');
const disease_symptom = JSON.parse(jsonData);


// determine which disease to focus on after initial input
const determineInitialDisease = (params) => {
	const matches = [];
	const user_symptoms = params.positive_symptoms;
	for (const {disease, symptom} of disease_symptom) {
		// uses every() so it wont recognize if user input is from different diseases
		if (user_symptoms.every(temp => symptom.includes(temp.toLowerCase()))) { // we could change the json file to all caps, otherwise keep toLowerCase()
			matches.push(disease);
		}
	}
	//console.log('matches: ' + matches)
	return {matches, user_symptoms};
}

var facts = {
	user: {
		positive_symptoms: [],
		negative_symptoms: [],
		previous_symptoms: [],
		start: true,
	},
	agent: {}
};

const main = async (questions) => {
	var facts = {
		user: {
			positive_symptoms: [],
			negative_symptoms: [],
			previous_symptoms: ['blurry'],
			start: false,
		},
		agent: {}
	};

	var prompter = require("prompt-sync")({ sigint: '' });


	// const PRIORITY = 100;
	// const initial = determineInitialDisease(facts.user);
	// for (i = 0; i < initial.matches.length; i++) {
	// 	R.prioritize(PRIORITY + 49 - i, {id: initial.matches[i]});
	// }


	while (true) {
		if (facts.user.previous_symptoms.length === 0) {
			facts.user.start = true;
		}
		if (facts.user.start) {
			const PRIORITY = 100;
			const initial = determineInitialDisease(facts.user);
			for (i = 0; i < initial.matches.length; i++) {
				R.prioritize(PRIORITY + 49 - i, {id: initial.matches[i]});
			}
		}
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
			console.log('Exit');
			break;
		}

		facts = output;
		// var initial2 = determineInitialDisease(facts.user);
		// for (i = 0; i < initial2.matches.length; i++) {
		// 	R.prioritize(PRIORITY + 49 - i, {id: initial2.matches[i]});
		// }
		console.log(facts.user);
	}





	// console.log('---------------------------------------')
	// console.log(R.activeRules)
	// console.log('---------------------------------------')


	// facts.agent['questions'] = questions;

	// const prompt = require("prompt-sync")({ sigint: '' });


	// console.log(await getAction(facts));

	// while (true) {
	// 	delete facts.agent.next_action;
	// 	// console.log(checkAllSymptoms(facts, 'asthma'));
	// 	checkAllSymptoms(facts, 'asthma')
	// 	let action = facts.agent.next_action;

	// 	if (action === undefined) {
	// 		break;
	// 	}
	// 	console.log(action.string());
		
	// 	let input = prompt(`>:`).toLowerCase();

	// 	if (input === 'x') {
	// 		break;
	// 	} else {
	// 		facts.user.symptoms[action.topic.toLowerCase()] = action.subtopic;
	// 	}
	// 	 console.log(facts.user.symptoms);	
	// }
	// console.log(facts);
};

const questions = disease_symptom;

// console.log(facts)
// setUserState('here', facts)
main(questions);





















function checkAllSymptoms(facts, disease) {
	if (!checkSymptoms(facts, disease)) {
		return false;
	}
	console.log('Key Symptoms: PASSED');

	return true;
}

function checkSymptoms(facts, disease) {
	const current_symptoms = facts.user.symptoms;
	const disease_symptoms = facts.agent.questions.find(obj => obj.disease === disease);
	// console.log('here')
	// console.log(disease_symptoms.symptom.length)
	// Check symptoms of this category
	const category_symptoms = disease_symptoms.symptom;
	var false_key_symptoms = 0;
	var threshhold = 4; 								// Atleast n symptoms, fetched from KB
	var length = category_symptoms.length;
						
	for (i = 0; i <  length; i++) {
		let symptom = category_symptoms[i];
		let next_symptom =  category_symptoms[i + 1];
		if (current_symptoms[symptom] === undefined) { 	// User has not determined this symptom. 
			console.log('ask ' + symptom.toUpperCase());					
			facts.agent.next_action = new Action('ASK', symptom.toUpperCase());
			return false;
		} else if (current_symptoms[symptom].value) {	// User has determined this symptom to be True.
			facts.agent.next_action = new Action('ASK', next_symptom.toUpperCase());			
			return false;	
		} else { 										// User has determined this symptom to be False.
			false_key_symptoms++;
			console.log('false key symptom = ' + false_key_symptoms)

			// Threshold to Pass?						// Find a Threshold
			if (length - threshhold <= false_key_symptoms) {
				console.log('pass? ' +  (length - threshhold) + ' <= ' + false_key_symptoms);
				return false;
			}
		}															
	}
	return true;
}