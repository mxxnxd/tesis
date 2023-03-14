const rulePriority = 50;

const diagnose_copd = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_short && // 2
				  symp.colds 		&& // 1
				  symp.confusion    && // 3
				  symp.cough_long 	&& // 1
				  symp.cyanosis 	&& // 3
				  symp.dizzy 		&& // 3
				  symp.fatigue		&& // 2
				  symp.fever_high	&& // 2
				  symp.heart_rapid 	&& // 3
				  symp.temp.phlegm	&& // 2.6	(AVG)
				  symp.temp.swell 	&& // 2 	(AVG)
				  symp.throat_clear && // 1
				  symp.weightloss	&& // 1
				  symp.wheeze; 		   // 2 	
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.COPD' : 'FI.DIAGNOSE.COPD';	
		R.stop();
	}
};

const diagnose_asthma = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.anxiety		&& // 3
				  symp.breath_rapid && // 3
				  symp.breath_short && // 2
				  symp.chest_pain 	&& // 3
				  symp.chest_tight  && // 3
				  symp.colds 		&& // 1
				  symp.cough        && // 1
				  symp.cough_hard 	&& // 3
				  symp.cough_long 	&& // 1
				  symp.cyanosis 	&& // 3
				  symp.fatigue		&& // 1
				  symp.headaches	&& // 1
				  symp.neck_tight	&& // 3
				  symp.pale	 		&& // 3
				  symp.sleep_hard	&& // 3
				  symp.wheeze	    && // 1
				  symp.wheeze_hard;    // 4
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.ASTHMA' : 'FI.DIAGNOSE.ASTHMA';	
		R.stop();
	}
};

const diagnose_pneumonia = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_rapid && // 1
				  symp.breath_short && // 1
				  symp.chest_pain 	&& // 3
				  symp.chills	 	&& // 2
				  symp.colds_long 	&& // 3
				  symp.confusion 	&& // 1
				  symp.cough        && // 2
				  symp.cough_long 	&& // 3
				  symp.cyanosis 	&& // 1
				  symp.fatigue		&& // 2
				  symp.fever		&& // 1
				  symp.fever_high	&& // 3
				  symp.heart_rapid	&& // 1
				  symp.nausea		&& // 1
				  symp.pale	 		&& // 1
				  symp.temp.phlegm  && // 2 (AVG)
				  symp.wheeze;		   // 1
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.PNEUMONIA' : 'FI.DIAGNOSE.PNEUMONIA';	
		R.stop();
	}
};

const diagnose_lung_cancer = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.appetite_loss && // 1
				  symp.blurry && 		// 3
				  symp.bone_pain && 	// 3
				  symp.breath_short && 	// 3
				  symp.chest_pain && 	// 3
				  symp.cough_blood && 	// 3
				  symp.cough_long && 	// 2
				  symp.fatigue && 		// 1
				  symp.fever && 		// 1
				  symp.headaches && 	// 1
				  symp.hoarseness && 	// 2
				  symp.phlegm_red && 	// 2
				  symp.r_infections && 	// 1
				  symp.swallow_hard && 	// 1
				  symp.swell_neck && 	// 1
				  symp.weakness && 		// 3
				  symp.weightloss && 	// 1
				  symp.wheeze; 			// 1
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.LUNGCANCER' : 'FI.DIAGNOSE.LUNGCANCER';	
		R.stop();
	}
};

const diagnose_tuberculosis = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.appetite_loss && // 2
				  symp.chest_pain && 	// 2
				  symp.chills && 		// 2
				  symp.cough_blood && 	// 2
				  symp.cough_long && 	// 2
				  symp.fatigue && 		// 2
				  symp.fever && 		// 2
				  symp.pale && 			// 2
				  symp.phlegm_red && 	// 2
				  symp.weightloss; 		// 2
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.TUBERCULOSIS' : 'FI.DIAGNOSE.TUBERCULOSIS';	
		R.stop();
	}
};

const applyRules = (R) => {
	R.register(diagnose_copd);
	R.register(diagnose_asthma);
	R.register(diagnose_pneumonia);
	R.register(diagnose_lung_cancer);
	R.register(diagnose_tuberculosis);
};

module.exports = {
	applyRules
};