/*
	--- --- --- Diagnosis --- --- ---

	'' represent NULL values (undetermined information).
	This is because Firebase does not allow storage of NULL data types.

	Ruleset for determining Agent Action during Disease Assesment (Diagnosis/Medical Impression).
*/

const Q = require('./rules-ask.js');			// Symptom Questions
const QM = Q.questionMap;						// Question Map


const priorityLevel = 40;					

const COPD = 'COPD';
const ASTHMA = 'ASTHMA';
const PNEUMONIA = 'PNEUMONIA';
const LUNGCANCER = 'LUNG_CANCER';
const TUBERCULOSIS = 'TUBERCULOSIS';

const HEARTFAILURE = 'HEART_FAILURE';
const HYPERTENSION = 'HYPERTENSION';
const CAD = 'CORONARY_ARTERY_DISEASE';
const ARRHYTHMIA = 'ARRHYTHMIA';
const CARDIOMYOPATHY = 'CARDIOMYOPATHY'
const VALVEDISEASE = 'VALVE_DISEASE';
const MYOCARDIALINFARCTION = 'MYOCARDIAL_INFARCTION';
const ANEURYSM = 'ANEURYSM';



const diagnoseCOPD = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + COPD;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.copd));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + COPD : 'FI-DIAGNOSE-'  + COPD;
		fact.user.diagnosis.illness = COPD;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.tachycardia) { score++; }
		if (S.dizzy) { score++; }
		if (S.fever) { score++; }
		if (S.confusion) { score++; }
		if (S.cyanosis) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}
};

const diagnoseAsthma = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + ASTHMA;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.asthma));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + ASTHMA : 'FI-DIAGNOSE-' + ASTHMA; 
		fact.user.diagnosis.illness = ASTHMA;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.anxiety) { score++; }
		if (S.cyanosis) { score++; }
		if (S.pale_sweat) { score++; }
		if (S.tachypnea) { score++; }
		if (S.neck_tight) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}
};

const diagnosePneumonia = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + PNEUMONIA;

		// Check Symptomps
		R.when(elicitate(R, fact, fact.rules.pneumonia));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + PNEUMONIA : 'FI-DIAGNOSE-' + PNEUMONIA;
		fact.user.diagnosis.illness = PNEUMONIA;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.cyanosis) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseLungCancer = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	
		const S = fact.user.symptoms;

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + LUNGCANCER;

		// Check Symptoms
		if (Q.askRInfections(R, fact)) { return R.when(false); }		// Additional Criteria
		R.when(S.r_infections && S.chest_pain && S.fatigue && S.cough);
		R.when(elicitate(R, fact, fact.rules.lung_cancer));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + LUNGCANCER : 'FI-DIAGNOSE-' + LUNGCANCER;
		fact.user.diagnosis.illness = LUNGCANCER;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.blurry) { score++; }
		if (S.bone_pain) { score++; }
		if (S.r_infections) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseTuberculosis = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + TUBERCULOSIS;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.tuberculosis));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + TUBERCULOSIS : 'FI-DIAGNOSE-' + TUBERCULOSIS;
		fact.user.diagnosis.illness = TUBERCULOSIS;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.phlegm_red) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseHeartFailure = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + HEARTFAILURE;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.heart_failure));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + HEARTFAILURE : 'FI-DIAGNOSE-' + HEARTFAILURE;
		fact.user.diagnosis.illness = HEARTFAILURE;

		// Severity (Temp Implementation)
		var score = 1;
		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseHypertension = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + HYPERTENSION;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.hypertension));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + HYPERTENSION : 'FI-DIAGNOSE-' + HYPERTENSION;
		fact.user.diagnosis.illness = HYPERTENSION;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.blood_urine) { score++; }
		if (S.dyspnea) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

// Minimum of 5 Questions
const diagnoseCoronaryArteryDisease = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + CAD;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.cad));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + CAD : 'FI-DIAGNOSE-' + CAD;
		fact.user.diagnosis.illness = CAD;

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseArrhythmia = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + ARRHYTHMIA;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.arrhythmia));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + ARRHYTHMIA : 'FI-DIAGNOSE-' + ARRHYTHMIA;	
		fact.user.diagnosis.illness = ARRHYTHMIA;

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseValveDisease = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + VALVEDISEASE;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.valve_disease));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-VALVE_DISEASE' : 'FI-DIAGNOSE-VALVE_DISEASE';
		fact.user.diagnosis.illness = 'VALVE_DISEASE';

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
}; 

const diagnoseCardiomyopathy = {
	priority: priorityLevel,
	condition: (R, fact) => {
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + CARDIOMYOPATHY;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.cardiomyopathy));	
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-CARDIOMYOPATHY' : 'FI-DIAGNOSE-CARDIOMYOPATHY';
		fact.user.diagnosis.illness = 'CARDIOMYOPATHY';

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseMyocardialInfarction = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + MYOCARDIALINFARCTION;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.myocardial_infarction));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + MYOCARDIALINFARCTION : 'FI-DIAGNOSE-' + MYOCARDIALINFARCTION;
		fact.user.diagnosis.illness = MYOCARDIALINFARCTION;

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseAneurysm = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const A = fact.agent;	

		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + ANEURYSM;

		// Check Symptoms
		R.when(elicitate(R, fact, fact.rules.aneurysm));
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-' + ANEURYSM : 'FI-DIAGNOSE-' + ANEURYSM;
		fact.user.diagnosis.illness = ANEURYSM;

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const noDiagnosis = {
	priority: 1,
	condition: (R, fact) => {	
		R.when(fact.agent.next_action === '');
	},
	consequence: (R, fact) => {
		// Event & Diagnosis
		fact.agent.status = 'NO-DIAGNOSIS';
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-DIAGNOSE-UNABLE_TO_DIAGNOSE' : 'FI-DIAGNOSE-UNABLE_TO_DIAGNOSE';
		fact.user.diagnosis.illness = 'UNKNOWN';
		R.stop();
	}
};

const applyRules = (R) => {
	R.register(diagnoseCOPD);
	R.register(diagnoseAsthma);
	R.register(diagnosePneumonia);
	R.register(diagnoseLungCancer);
	R.register(diagnoseTuberculosis);
	R.register(diagnoseHeartFailure);
	R.register(diagnoseHypertension);
	R.register(diagnoseCoronaryArteryDisease);
	R.register(diagnoseArrhythmia);
	R.register(diagnoseValveDisease);
	R.register(diagnoseCardiomyopathy);
	R.register(diagnoseMyocardialInfarction);
	R.register(diagnoseAneurysm);
	R.register(noDiagnosis);
};

module.exports = {
	applyRules
};

/*
	Utility Function
*/
const elicitate = (R, fact, rule) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	// Check Common Symptoms
	const CS = rule.symptoms.common;
	for (i = 0; i < CS.length; i++) {
		if (S[CS[i]] != undefined) {
			if (QM[CS[i]](R, fact) || !S[CS[i]]) { 	
				return false;
			}
		} else {
			if (QM[CS[i]](R, fact) || !G[CS[i]]) { 
				return false
			} 
		}	
	}

	// Check Other Symptoms
	const OS = rule.symptoms.other[0];
	var n = 0, min = rule.symptoms.other[1];

	for (i = 0; i < OS.length; i++) {
		if (OS[i] === '') { break; }
		if (S[OS[i]]) { n++; }
	}		
	for (i = 0; i < OS.length; i++) {
		if (OS[i] === '') { break; }
		if (n < min) {
			if (QM[OS[i]](R, fact)) { 
				return false;
			} 
		} else {
			break;
		}
	}
	if (n < min) { 				
		return false;
	}
	
	// Check Severe Symptoms
	const SS = rule.symptoms.severe;
	for (i = 0; i < SS.length; i++) {
		if (SS[i] === '') { break; }
		if (S[SS[i]] != undefined) {
			if (QM[SS[i]](R, fact)) { 
				return false;
			}
		} else {
			if (QM[SS[i]](R, fact)) { 
				return false;
			}
		}	
	}
	return true;
};