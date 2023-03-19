const rulePriority = 50;

const diagnose_copd = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;
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
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-COPD' : 'FI-DIAGNOSE-COPD';
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
		const G = fact.user.group;
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
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-ASTHMA' : 'FI-DIAGNOSE-ASTHMA';
		fact.user.diagnosis.illness = 'ASTHMA';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_pneumonia  = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;
		// Expression
		const E =	
			// Common Symptoms:
			G.phlegm && S.cough && S.tachypnea && S.chest_pain &&
			(S.fever || S.chills || S.pale_sweat) &&

			// Other Symptoms
			(S.nausea || S.confusion || S.colds || S.cyanosis) &&	
			(S.fatigue || S.wheeze)	&&	
			(S.dyspnea || S.trachycardia);		
		R.when(E);
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-PNEUMONIA' : 'FI-DIAGNOSE-PNEUMONIA';
		fact.user.diagnosis.illness = 'PNEUMONIA';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_lung_cancer  = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms:
			S.cough && S.chest_pain && S.dyspnea && S.phlegm_red && S.fatigue && S.weightloss &&

			// Other Symptoms:
			(S.appetite_loss || S.hoarsness || S.weakness || S.blurry || S.bone_pain || S.neck_swell) &&
			(S.headaches || S.wheeze || S.fever || S.dysphasia);
			
		const E2 =
			S.r_infections && S.cough && S.fatigue && S.chest_pain;
		R.when(E || E2);
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-LUNG_CANCER' : 'FI-DIAGNOSE-LUNG_CANCER';
		fact.user.diagnosis.illness = 'LUNG_CANCER';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_tuberculosis = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms:
			S.chest_pain && S.phlegm_red && S.cough && S.fatigue &&
			
			// Other Symptoms
			(S.fever || S.pale_sweat || S.chills) &&
			(S.weightloss || S.appetite_loss);
		R.when(E);
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-TUBERCULOSIS' : 'FI-DIAGNOSE-TUBERCULOSIS';
		fact.user.diagnosis.illness = 'TUBERCULOSIS';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_heart_failure = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms:
			S.dyspnea && S.fatigue && S.weakness &&

			// Other Symptoms
			(S.chest_pain || S.trachycardia) &&
			(S.dizzy || S.faint || S.nausea) &&	
			(S.headaches || S.wheeze || S.fever) &&
			(S.legs_swell || S.belly_swell);
		R.when(E);
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-HEART_FAILURE' : 'FI-DIAGNOSE-HEART_FAILURE';	
		fact.user.diagnosis.illness = 'HEART_FAILURE';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_hypertension = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			S.headaches && S.dizzy && S.chest_pain && S.blurry &&

			// Other Symptoms
			(S.belly_swell || S.legs_swell) &&
			(S.fatigue || S.faint || S.dyspnea || S.cyanosis || S.trachycardia);
			
		const E2 =
			S.urine_blood;
		R.when(E || E2)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-HYPERTENSION' : 'FI-DIAGNOSE-HYPERTENSION';	
		fact.user.diagnosis.illness = 'HYPERTENSION';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_coronary_artery_disease = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			S.chest_pain && S.fatigue && S.dyspnea && S.dizzy && S.nausea && S.muscle_pain
		R.when(E)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-CORONARY_ARTERY_DISEASE' : 'FI-DIAGNOSE-CORONARY_ARTERY_DISEASE';	
		fact.user.diagnosis.illness = 'CORONARY_ARTERY_DISEASE';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_arrhythmia = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			S.fatigue && S.dyspnea && S.dizzy && S.tachycardia &&

			// Other Symptoms:
			(S.chest_pain || S.faint || S.pale_sweat || S.blurry || S.anxiety);

		R.when(E)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-ARRHYTHMIA' : 'FI-DIAGNOSE-ARRHYTHMIA';	
		fact.user.diagnosis.illness = 'ARRHYTHMIA';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_valve_disease = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			S.chest_pain && S.fatigue && S.dyspnea && S.dizzy && S.tachycardia && 

			// Other Symptoms
			(S.legs_swell || S.belly_swell) && S.weakness;
		R.when(E)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-VALVE_DISEASE' : 'FI-DIAGNOSE-VALVE_DISEASE';	
		fact.user.diagnosis.illness = 'VALVE_DISEASE';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_cardiomyopathy = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			S.dizzy && S.fatigue && S.dyspnea && S.faint &&
			(S.legs_swell || S.belly_swell) &&

			// Other Symptoms
			(S.chest_pain || S.cough);
		R.when(E)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-CARDIOMYOPATHY' : 'FI-DIAGNOSE-CARDIOMYOPATHY';	
		fact.user.diagnosis.illness = 'CARDIOMYOPATHY';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_myocardial_infarction = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			(S.fatigue || S.weakness) && S.dyspnea && (S.dizzy || S.nausea) && S.chest_pain &&
			(S.back_pain || S.mouth_pain || S.neck_shoulder_pain || S.arm_pain || S.abdomen_pain) &&

			// Other Symptoms
			(S.tachycardia || S.pale_sweat || S.dysphasia || S.heartburn);
		R.when(E)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-MYOCARDIAL_INFARCTION' : 'FI-DIAGNOSE-MYOCARDIAL_INFARCTION';	
		fact.user.diagnosis.illness = 'MYOCARDIAL_INFARCTION';

		// Severity
		fact.user.diagnosis.severity = 1;

		R.stop();
	}
};

const diagnose_aneurysm = {
	priority: rulePriority,
	condition: (R, fact) => {
		const S = fact.user.symptoms;
		// Expression
		const E =	
			// Common Symptoms: 
			S.headaches && S.chest_pain && S.cough &&	
			S.dysphasia && S.hoarseness && S.abdomen_pain
		R.when(E)
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-ANEURYSM' : 'FI-DIAGNOSE-ANEURYSM';
		fact.user.diagnosis.illness = 'ANEURYSM';

		// Severity
		fact.user.diagnosis.severity = 1;

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