const ruleAskFever = {
	priority: 1,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fever == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = 'EN-ASK-FEVER';
		R.stop();
	}
};

const ruleAskShortBreath = {
	priority: 1,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.shortbreath == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = 'EN-ASK-SHORTBREATH';
		R.stop();
	}
};

const applyRules = (R) => {
	R.register(ruleAskFever);
	R.register(ruleAskShortBreath);
};

module.exports = {
	applyRules
};