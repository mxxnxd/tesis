const prompt = require("prompt-sync")({ sigint: true });

const {RuleEngine} = require('node-rules');

const R = new RuleEngine();

let facts = {
	name: 'Steven',
	sick: false,
	fever: null
	appetite
};

const ruleA = {
	priority: 1,
	condition: (R, fact) => {
		R.when(fact.fever == null && fact.);
	},
	consequence: (R, fact) => {
		fact.fever = prompt('Do you have a fever? ').toLowerCase() === 'y';
		R.restart();
	}
};

const ruleB = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.fever);
	},
	consequence: (R, fact) => {
		fact.sick = true;
		R.stop();
	}
};

const ruleC = {

}

R.register(ruleA);
R.register(ruleB);

R.execute(facts, (data) => {
	if (data.sick) {
		console.log(`${data.name} is sick`);
	} else {
		console.log(`${data.name} is not sick`);
	}
});
