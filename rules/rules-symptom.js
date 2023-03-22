/*
	--- --- --- Grouped Symptoms --- --- ---

	'' represent NULL values (undetermined information).
	This is because Firebase does not allow storage of NULL data types.
*/
const priorityLevel = 50;

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

const applyRules = (R) => {
	R.register(groupPhlegmTrue);
	R.register(groupPhlegmFalse);
};

module.exports = {
	applyRules
};