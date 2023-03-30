/*
	--- --- --- Grouped Symptoms --- --- ---

	'' represent NULL values (undetermined information).
	This is because Firebase does not allow storage of NULL data types.
*/
const priorityLevel = 50;

// Phlegm Clear, Phlegm White, Phlegm Green, Phlegm Red
const groupPhlegmTrue = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.phlegm !== '') { return R.next(); } // Stop IF Group was determined (True/False).
		R.when(S.phlegm_clear || S.phlegm_white || S.phlegm_green || S.phlegm_red);
	},
	consequence: (R, fact) => {
		fact.user.group.phlegm = true;
		R.next();
	}
};

// Phlegm Clear, Phlegm White, Phlegm Green, Phlegm Red
const groupPhlegmFalse = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.phlegm !== '') { 
			return R.next(); // Stop IF Group was determined (True/False).
		} 
		if (S.phlegm_clear === '' || S.phlegm_white === '' || S.phlegm_green === '' || S.phlegm_red === '') { 
			return R.next(); // Stop IF Phlegm Symptoms are undetermined ('').
		} 
		R.when(!S.phlegm_clear && !S.phlegm_white && !S.phlegm_green && !S.phlegm_red);
	},
	consequence: (R, fact) => {
		fact.user.group.phlegm = false;
		R.next();
	}
};

// Fever, Pale Sweat, Chills
const groupHecticFeverTrue = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.hectic_fever !== '') { return R.next(); } // Stop IF Group was determined (True/False).
		R.when(S.fever || S.pale_sweat || S.chills);
	},
	consequence: (R, fact) => {
		fact.user.group.hectic_fever = true;
		R.next();
	}
};

// Fever, Pale Sweat, Chills
const groupHecticFeverFalse = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.hectic_fever !== '') { 
			return R.next(); // Stop IF Group was determined (True/False).
		} 
		if (S.fever === '' || S.pale_sweat === '' || S.chills === '') { 
			return R.next(); // Stop IF Phlegm Symptoms are undetermined ('').
		}
		R.when(!S.fever && !S.pale_sweat && !S.chills);
	},
	consequence: (R, fact) => {
		fact.user.group.hectic_fever = false;
		R.next();
	}
};

// Nausea, Dizzy, Faint
const groupVertigoTrue = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.vertigo !== '') { return R.next(); } // Stop IF Group was determined (True/False).
		R.when(S.nausea || S.dizzy || S.faint);
	},
	consequence: (R, fact) => {
		fact.user.group.vertigo = true;
		R.next();
	}
};

// Nausea, Dizzy, Faint
const groupVertigoFalse = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.vertigo !== '') { 
			return R.next(); // Stop IF Group was determined (True/False).
		} 
		if (S.nausea === '' || S.dizzy === '' || S.faint === '') { 
			return R.next(); // Stop IF Phlegm Symptoms are undetermined ('').
		}
		R.when(!S.nausea && !S.dizzy && !S.faint);
	},
	consequence: (R, fact) => {
		fact.user.group.vertigo = false;
		R.next();
	}
};

const groupSwellTrue = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.swell !== '') { return R.next(); } // Stop IF Group was determined (True/False).
		R.when(S.legs_swell || S.belly_swell);
	},
	consequence: (R, fact) => {
		fact.user.group.swell = true;
		R.next();
	}
};

// Nausea, Dizzy, Faint
const groupSwellFalse = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		if (G.swell!== '') { 
			return R.next(); // Stop IF Group was determined (True/False).
		} 
		if (S.legs_swell === '' || S.belly_swell === '') { 
			return R.next(); // Stop IF Phlegm Symptoms are undetermined ('').
		}
		R.when(!S.belly_swell && !S.legs_swell);
	},
	consequence: (R, fact) => {
		fact.user.group.swell = false;
		R.next();
	}
};

const applyRules = (R) => {
	R.register(groupPhlegmTrue);
	R.register(groupPhlegmFalse);
	R.register(groupHecticFeverTrue);
	R.register(groupHecticFeverFalse);
	R.register(groupVertigoTrue);
	R.register(groupVertigoFalse);
	R.register(groupSwellTrue);
	R.register(groupSwellFalse);
};

module.exports = {
	applyRules
};



