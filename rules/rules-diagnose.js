const ruleDiagnoseSick = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fever);
	},
	consequence: (R, fact) => {
		fact.user.sick = true;
		R.stop();
	}
};

const applyRules = (R) => {
	R.register(ruleDiagnoseSick);
};

module.exports = {
	applyRules
};