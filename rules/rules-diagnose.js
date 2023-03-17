const rulePriority = 50;

const diagnose_copd = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.group;
		// Expression
		const E =
			// Common Symptoms:
			G.phlegm &&	S.cough && S.wheeze && S.dyspnea &&

			// Severe Symptoms:
			(S.trachycardia || S.dizzy || S.fever || S.confusion || S.cyanosis) &&

			// Other Symptoms
			(S.fatigue || S.legs_swell) && (S.dysphasia || S.weightloss || S.colds);
		R.when(E);
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.COPD' : 'FI.DIAGNOSE.COPD';
		fact.user.diagnosis.illness = 'COPD';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_asthma  = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.group;
		// Expression
		const E =
			// Common Symptoms:
			S.wheeze && S.dyspnea && (S.chest_tight || S.chest_pain) &&

			// Severe Symptoms
			(S.anxiety || S.cyanosis || S.pale_sweat || S.tachypnea || S.neck_tight) &&

			// Other Symptoms
			(S.sleep_hard || S.fatigue || S.headaches || S.colds);
		R.when(E);
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.ASTHMA' : 'FI.DIAGNOSE.ASTHMA';
		fact.user.diagnosis.illness = 'ASTHMA';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */

const diagnose_pneumonia = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_rapid && 	// 1
				  symp.breath_short && 	// 1
				  symp.chest_pain && 	// 3
				  symp.chills && 		// 2
				  symp.colds_long && 	// 3
				  symp.confusion && 	// 1
				  symp.cough && 		// 2
				  symp.cough_long && 	// 3
				  symp.cyanosis && 		// 1
				  symp.fatigue && 		// 2
				  symp.fever && 		// 1
				  symp.fever_high && 	// 3
				  symp.heart_rapid && 	// 1
				  symp.nausea && 		// 1
				  symp.pale	&& 			// 1
				  symp.temp.phlegm && 	// 2 (AVG)
				  symp.wheeze;		   	// 1
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
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.LUNG_CANCER' : 'FI.DIAGNOSE.LUNG_CANCER';	
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

const diagnose_heart_failure = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_short && 		// 3
				  symp.chest_pain && 		// 3
				  symp.dizzy && 			// 1
				  symp.faint && 			// 2
				  symp.fatigue && 			// 2
				  symp.fever && 			// 1
				  symp.headaches && 		// 1 
				  symp.heart_rapid && 		// 3
				  symp.nausea && 			// 2
				  fact.temp.swell && 		// AVG(2)
				  fact.temp.swell_lower && 	// AVG(2)
				  symp.weakness &&			// 4
				  symp.weightgain &&		// 2
				  symp.wheeze; 				// 2
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.HEART_FAILURE' : 'FI.DIAGNOSE.HEART_FAILURE';	
		R.stop();
	}
};

const diagnose_hypertension = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.blurry && 			// 3
				  symp.breath_short && 		// 4
				  symp.chest_pain && 		// 3
				  symp.cyanosis && 			// 3
				  symp.dizzy && 			// 1
				  symp.faint && 			// 1
				  symp.fatigue && 			// 3
				  symp.headaches && 		// 4 
				  symp.heart_rapid && 		// 3
				  fact.temp.swell && 		// AVG(1.6)
				  symp.urine_blood;			// 3
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.HYPERTENSION' : 'FI.DIAGNOSE.HYPERTENSION';	
		R.stop();
	}	
};

const diagnose_coronary_artery_disease = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_short && 		// 2
				  symp.chest_pain && 		// 2
				  symp.dizzy && 			// 1
				  symp.fatigue && 			// 2
				  symp.muscle_pain &&		// 1
				  symp.nausea;				// 1
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.CORONARY_ARTERY_DISEASE' : 'FI.DIAGNOSE.CORONARY_ARTERY_DISEASE';	
		R.stop();
	}	
};

const diagnose_arrhythmia = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.anxiety && 			// 2
				  symp.blurry && 			// 1
				  symp.breath_short && 		// 2
				  symp.chest_pain && 		// 2
				  symp.dizzy && 			// 2
				  symp.faint && 			// 2
				  symp.fatigue && 			// 2
				  symp.heart_rapid && 		// 2
				  symp.pale;; 				// 2
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.ARRHYTHMIA' : 'FI.DIAGNOSE.ARRHYTHMIA';	
		R.stop();
	}	
};

const diagnose_valve_disease = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_short && 		// 2
				  symp.chest_pain && 		// 2
				  symp.dizzy && 			// 2
				  symp.fatigue && 			// 1
				  symp.heart_rapid && 		// 2
				  fact.temp.swell && 	 	// AVG(2)
				  symp.weakness && 			// 1
				  symp.weightgain; 			// 1
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.VALVE_DISEASE' : 'FI.DIAGNOSE.VALVE_DISEASE';	
		R.stop();
	}	
};

const diagnose_cardiomyopathy = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_short && 		// 1
				  symp.chest_pain && 		// 3
				  symp.cough && 			// 1
				  symp.dizzy && 			// 1
				  symp.faint && 			// 1
				  symp.fatigue && 			// 1
				  fact.temp.swell;	 		// AVG(1)
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.CARDIOMYOPATHY' : 'FI.DIAGNOSE.CARDIOMYOPATHY';	
		R.stop();
	}	
};

const diagnose_myocardial_infarction = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.breath_short && 		// 2
				  symp.chest_pain && 		// 2
				  symp.dizzy && 			// 2
				  symp.fatigue && 			// 1
				  symp.heartburn && 		// 2
				  symp.heart_rapid && 		// 1
				  symp.nausea && 			// 2
				  fact.temp.pain && 		// AVG(1.3)
				  symp.pale && 				// 1
				  symp.weakness; 			// 1
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.MYOCARDIAL_INFARCTION' : 'FI.DIAGNOSE.MYOCARDIAL_INFARCTION';	
		R.stop();
	}	
};

const diagnose_aneurysm = {
	priority: rulePriority,
	condition: (R, fact) => {
		let symp = fact.user.symptoms;
		let exp = symp.abdomen_pain && 		// 1
				  symp.chest_pain && 		// 1
				  symp.cough_long && 		// 1
				  symp.headaches && 		// 3
				  symp.hoarseness && 		// 1
				  symp.swallow_hard 		// 1
		R.when(exp);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.ANEURYSM' : 'FI.DIAGNOSE.ANEURYSM';	
		R.stop();
	}	
};

const applyRules = (R) => {
	R.register(diagnose_copd);
	R.register(diagnose_asthma);
	R.register(diagnose_pneumonia);
	R.register(diagnose_lung_cancer);
	R.register(diagnose_tuberculosis);

	R.register(diagnose_heart_failure);
	R.register(diagnose_hypertension);
	R.register(diagnose_coronary_artery_disease);
	R.register(diagnose_arrhythmia);
	R.register(diagnose_valve_disease);
	R.register(diagnose_cardiomyopathy);
	R.register(diagnose_myocardial_infarction);
	R.register(diagnose_aneurysm);
};

module.exports = {
	applyRules
};