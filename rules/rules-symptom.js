const rulePriority = 30;

/*
	Grouped Symptoms
*/

const symptom_group_phlegm = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.phlegm) {
			R.next();
			return;
		}

		// Expression
		const E =
			S.phlegm_clear ||
			S.phlegm_white ||
			S.phlegm_green ||
			S.phlegm_red;

		R.when(E);
	},
	consequence: (R, fact) => {
		fact.user.group.phlegm = true;
		R.next();
	}
};

const applyRules = (R) => {
	R.register(symptom_group_phlegm);
};

module.exports = {
	applyRules
};