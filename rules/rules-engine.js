const {RuleEngine} = require('node-rules');
const rules_ask = require('./rules-ask'); 
const rules_diagnose = require('./rules-diagnose'); 

// Rule Engine
const R = new RuleEngine();

// Ruleset
rules_ask.applyRules(R);
rules_diagnose.applyRules(R);

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
			symptoms: {
				fever: true,
				shortbreath: null
			},
			sick: false
		},
		agent: {
			prev_action: null,	
			next_action: null
		}
	};

	console.log(await getAction(fact));
}

main();