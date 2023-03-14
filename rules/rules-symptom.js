const rulePriority = 30;

/*
	Grouped Symptoms
*/

const symptom_group_phlegm = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		if (fact.temp.phlegm) { R.next(); return; }
		R.when(symp.phlegm_clear  ||
			   symp.phlegm_green  ||
			   symp.phlegm_red    ||
			   symp.phlegm_white  ||
			   symp.phlegm_yellow);
	},
	consequence: (R, fact) => {
		fact.temp.phlegm = true;
		R.next();
	}
};

const symptom_group_swell_lower = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		if (fact.temp.swell_lower) { R.next(); return; }
		R.when(symp.swell_ankle ||
			   symp.swell_feet  ||
			   symp.swell_legs);
	},
	consequence: (R, fact) => {
		fact.temp.swell_lower = true;
		R.restart();
	}
};

const symptom_group_swell_upper = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		if (fact.temp.swell_upper) { R.next(); return; }
		R.when(symp.swell_neck ||
			   symp.swell_belly);
	},
	consequence: (R, fact) => {
		fact.temp.swell_upper = true;
		R.restart();
	}
};

const symptom_group_swell = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		if (fact.temp.swell) { R.next(); return; }
		R.when(symp.swell_ankle ||
			   symp.swell_feet  ||
			   symp.swell_belly ||
			   symp.swell_beck  ||
			   symp.swell_legs);
	},
	consequence: (R, fact) => {
		fact.temp.swell = true;
		R.restart();
	}
};

const symptom_group_pain = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		if (fact.temp.pain) { R.next(); return; }
		R.when(symp.pain_arm ||
			   symp.pain_back ||
			   symp.pain_belly ||
			   symp.pain_jaw ||
			   symp.pain_neck ||
			   symp.pain_shoulder ||
			   symp.pain_teeth ||
			   symp.pain_throat);
	},
	consequence: (R, fact) => {
		fact.temp.pain = true;
		R.restart();
	}
};

/*
	Similar Symptoms
*/

const symptom_phlegm_red = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		R.when(symp.phlegm_red);
	},
	consequence: (R, fact) => {
		fact.user.symptoms.cough_blood = true;
		R.next();
	}	
};

const symptom_wheeze_hard = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		R.when(symp.wheeze_hard);
	},
	consequence: (R, fact) => {
		fact.user.symptoms.wheeze = true;
		R.next();
	}
};

const symptom_cough_hard = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		R.when(symp.cough_hard);
	},
	consequence: (R, fact) => {
		fact.user.symptoms.cough = true;
		R.next();
	}	
};

const symptom_cough_long = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		R.when(symp.cough_long);
	},
	consequence: (R, fact) => {
		fact.user.symptoms.cough = true;
		R.next();
	}	
};

const symptom_cough_blood = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		R.when(symp.cough_blood);
	},
	consequence: (R, fact) => {
		fact.user.symptoms.cough = true;
		fact.user.symptoms.phlegm_red = true;
		R.next();
	}	
};

const symptom_colds_long = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		R.when(symp.colds_long);
	},
	consequence: (R, fact) => {
		fact.user.symptoms.colds = true;
		R.next();
	}	
};

const applyRules = (R) => {
	R.register(symptom_wheeze_hard);
	R.register(symptom_cough_hard);
	R.register(symptom_cough_long);
	R.register(symptom_cough_blood);
	R.register(symptom_colds_long);

	R.register(symptom_group_phlegm);
	R.register(symptom_group_swell_lower);
	R.register(symptom_group_swell_upper);
	R.register(symptom_group_swell);
	R.register(symptom_group_pain);
};

module.exports = {
	applyRules
};