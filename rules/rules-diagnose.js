/*
	--- --- --- Diagnosis --- --- ---

	'' represent NULL values (undetermined information).
	This is because Firebase does not allow storage of NULL data types.

	Ruleset for determining Agent Action during Disease Assesment (Diagnosis/Medical Impression).
*/

const Q = require('./rules-ask.js');

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

// Minimum of 11 Questions
const diagnoseCOPD = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('1')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + COPD;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askWheeze(R, fact) || !S.wheeze) { return skip(R); }
		if (Q.askPhlegm(R, fact) || !G.phlegm) { return skip(R); }

		// Check Other Symptoms (atleast 2)
		var n = 0, min = 2 // count, minimum no. of symptoms.

		if (S.fatigue) { n++; }
		if (S.legs_swell) { n++; }
		if (S.dysphasia) { n++; }
		if (S.weightloss) { n++; }	
		if (S.colds) { n++; }

		if (n < min) {
			if (Q.askFatigue(R, fact)) { return skip(R); }				
		}
		if (n < min) {
			if (Q.askDysphasia(R, fact)) { return skip(R); }	
		}
		if (n < min) {
			if (Q.askLegsSwell(R, fact)) { return skip(R); }
		}		
		if (n < min) {
			if (Q.askWeightloss(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askColds(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }

		// Check Severe Symptoms (Optional)
		if (Q.askTachycardia(R, fact)) { return skip(R); }
		if (Q.askCyanosis(R, fact)) { return skip(R); }
		if (Q.askDizzy(R, fact)) { return skip(R); }
		if (Q.askFever(R, fact)) { return skip(R); }
		if (Q.askConfusion(R, fact)) { return skip(R); }

		R.when(true);
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

// Minimum of 11 Questions
const diagnoseAsthma = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('2')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + ASTHMA;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askWheeze(R, fact) || !S.wheeze) { return skip(R); };
		if (Q.askChestTight(R, fact) || !S.chest_tight) { return skip(R); }

		// Check Other Symptoms (atleast 2)
		var n = 0, min = 2 // count, minimum no. of symptoms.

		if (S.sleep_hard) { n++; }
		if (S.fatigue) { n++; }
		if (S.headaches) { n++; }
		if (S.colds) { n++; }

		if (n < min) {
			if (Q.askFatigue(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askHeadaches(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askColds(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askSleepHard(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }
	
		// Check Severe Symptoms (Optional)
		if (Q.askAnxiety(R, fact)) { return skip(R); }
		if (Q.askCyanosis(R, fact)) { return skip(R); }
		if (Q.askPaleSweat(R, fact)) { return skip(R); }
		if (Q.askTachypnea(R, fact)) { return skip(R); }
		if (Q.askNeckTight(R, fact)) { return skip(R); }

		R.when(true);
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

// Minimum of 9 Questions
const diagnosePneumonia = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('3')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + PNEUMONIA;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askCough(R, fact) || !S.cough) { return skip(R); }
		if (Q.askTachypnea(R, fact) || !S.tachypnea) { return skip(R); }
		if (Q.askPhlegm(R, fact) || !G.phlegm) { return skip(R); }

		var n = 0, min = 1; // count, minimum no. of symptoms.

		if (!(S.fever || S.pale_sweat || S.chills)) {
			if (Q.askFever(R, fact)) { return skip(R); }
			if (Q.askPaleSweat(R, fact)) { return skip(R); }
			if (Q.askChills(R, fact)) { return skip(R); }
		}

		// Check Other Symptoms (atleast 3)
		n = 0, min = 3 // count, minimum no. of symptoms.

		if (S.nausea) { n++; }
		if (S.confusion) { n++; }
		if (S.colds) { n++; }
		if (S.fatigue) { n++; }	
		if (S.wheeze) { n++; }	
		if (S.dyspnea) { n++; }	
		if (S.tachycardia) { n++; }	

		if (n < min) {
			if (Q.askFatigue(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWheeze(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askDyspnea(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askTachycardia(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askNausea(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askColds(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askConfusion(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }

		// Check Severe Symptoms (Optional)
		if (Q.askCyanosis(R, fact)) { return skip(R); }

		R.when(true);
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

// Minimum of 4 Questions
const diagnoseLungCancer = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('4')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + LUNGCANCER;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askCough(R, fact) || !S.cough) { return skip(R); }

		if (Q.askRInfections(R, fact)) { return skip(R); }
		R.when(S.r_infections);

		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askPhlegmRed(R, fact) || !S.phlegm_red) { return skip(R); }
		if (Q.askWeightloss(R, fact) || !S.weightloss) { return skip(R); }

		// Check Other Symptoms (atleast 3) 
		var n = 0, min = 3 // count, minimum no. of symptoms.

		if (S.appetite_loss) { n++; }
		if (S.hoarseness) { n++; }
		if (S.weakness) { n++; }
		if (S.neck_swell) { n++; }
		if (S.headaches) { n++; }
		if (S.wheeze) { n++; }
		if (S.fever) { n++; }
		if (S.dysphasia) { n++; }

		if (n < min) {
			if (Q.askHeadaches(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWheeze(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askFever(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWeakness(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askDysphasia(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askAppetiteLoss(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askHoarseness(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askNecKSwell(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }

		// Check Severe Symptoms (Optional)
		if (Q.askBlurry(R, fact)) { return skip(R); }
		if (Q.askBonePain(R, fact)) { return skip(R); };

		R.when(true);
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

// Minimum of 7 Questions
const diagnoseTuberculosis = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('5')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + TUBERCULOSIS;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askCough(R, fact) || !S.cough) { return skip(R); }
		if (Q.askPhlegm(R, fact) || !G.phlegm) { return skip(R); }

		// Check Other Symptoms (atleast 3) 
		var n = 0, min = 2 // count, minimum no. of symptoms.

		if (S.fever) { n++; }
		if (S.pale_sweat) { n++; }
		if (S.chills) { n++; }
		if (S.weightloss) { n++; }
		if (S.appetite_loss) { n++; }

		if (n < min) {
			if (Q.askFever(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askPaleSweat(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askChills(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWeightloss(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askAppetiteLoss(R, fact)) { return skip(R); }
		}

		// Check Severe Symptoms (Optional)
		if (Q.askPhlegmRed(R, fact)) { return skip(R); }

		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.' + TUBERCULOSIS : 'FI.DIAGNOSE.' + TUBERCULOSIS;
		fact.user.diagnosis.illness = TUBERCULOSIS;

		// Severity (Temp Implementation)
		var score = 1;
		if (S.phlegm_red) { score++; }

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

// Minimum of 6 Questions
const diagnoseHeartFailure = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('6')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + HEARTFAILURE;

		R.next();

		// Check Common Symptoms
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askWeakness(R, fact) || !S.weakness) { return skip(R); }

		if (!(S.dizzy || S.nausea || S.faint)) {
			if (Q.askDizzy(R, fact)) { return skip(R); }
			if (Q.askNausea(R, fact)) { return skip(R); }
			if (Q.askFaint(R, fact)) { return skip(R); }
		} 

		// Check Other Symptoms (atleast 3) 
		var n = 0, min = 3 // count, minimum no. of symptoms.

		if (S.chest_pain) { n++; }
		if (S.tachycardia) { n++; }
		if (S.headaches) { n++; }
		if (S.wheeze) { n++; }
		if (S.fever) { n++; }
		if (S.legs_swell) { n++; }
		if (S.belly_swell) { n++; }

		if (n < min) {
			if (Q.askTachycardia(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askHeadaches(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWheeze(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askFever(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askLegsSwell(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askBellySwell(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }

		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.' + HEARTFAILURE : 'FI.DIAGNOSE.' + HEARTFAILURE;
		fact.user.diagnosis.illness = HEARTFAILURE;

		// Severity (Temp Implementation)
		var score = 1;
		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

// Minimum of 7 Questions
const diagnoseHypertension = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const A = fact.agent;
		const G = fact.user.group;

		// console.log('7')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + HYPERTENSION;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askDizzy(R, fact) || !S.dizzy) { return skip(R); }
		if (Q.askHeadaches(R, fact) || !S.headaches) { return skip(R); }
		if (Q.askBlurry(R, fact) || !S.blurry) { return skip(R); }

		// Check Other Symptoms (atleast 1) 
		var n = 0, min = 3 // count, minimum no. of symptoms.

		if (S.fatigue) { n++; }
		if (S.dyspnea) { n++; }
		if (S.cyanosis) { n++; }
		if (S.faint) { n++; }
		if (S.tachycardia) { n++; }
		if (S.legs_swell) { n++; }
		if (S.belly_swell) { n++; }

		if (n < min) { 
			if (Q.askFatigue(R, fact)) { return skip(R) }; 
		}
		if (n < min) { 
			if (Q.askDyspnea(R, fact)) { return skip(R) }; 
		}
		if (n < min) { 
			if (Q.askCyanosis(R, fact)) { return skip(R) }; 
		}
		if (n < min) { 
			if (Q.askFaint(R, fact)) { return skip(R) }; 
		}
		if (n < min) { 
			if (Q.askTachycardia(R, fact)) { return skip(R) }; 
		}
		if (n < min) { 
			if (Q.askLegsSwell(R, fact)) { return skip(R) }; 
		}
		if (n < min) { 
			if (Q.askBellySwell(R, fact)) { return skip(R) }; 
		}
		if (n < min) { return skip(R); }

		// Check Severe Symptoms (Optional)
		if (Q.askBloodUrine(R, fact)) { return skip(R); }

		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.DIAGNOSE.' + HYPERTENSION : 'FI.DIAGNOSE.' + HYPERTENSION;
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
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('8')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + CAD;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (!(S.dizzy || S.nausea)) {
			if (Q.askDizzy(R, fact)) { return skip(R); }
			if (Q.askNausea(R, fact)) { return skip(R); }
		}
		if (Q.askMusclePain(R, fact) || !S.muscle_pain) { return skip(R); }

		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.' + CAD : 'FI.DIAGNOSE.' + CAD;
		fact.user.diagnosis.illness = CAD;

		// Severity (Temp Implementation)
		var score = 1;

		fact.user.diagnosis.severity = score;
		R.stop();
	}	
};

const diagnoseArrythimia = {
	priority: priorityLevel,
	condition: (R, fact) => {	
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('9')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + ARRHYTHMIA;

		R.next();

		// Check Common Symptoms	 
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askDizzy(R, fact) || !S.dizzy) { return skip(R); }
		if (Q.askTachycardia(R, fact) || !S.tachycardia) { return skip(R); }

		// Check Other Symptoms (atleast 2)
		var n = 0, min = 3;

		if (S.chest_pain) { n++; }
		if (S.faint) { n++; }
		if (S.pale_sweat) { n++; }
		if (S.blurry) { n++; }
		if (S.anxiety) { n++; }

		if (n < min) {
			if (Q.askChestPain(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askPaleSweat(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askFaint(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askBlurry(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askAnxiety(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }
		
		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.' + ARRHYTHMIA : 'FI.DIAGNOSE.' + ARRHYTHMIA;	
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
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('10')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-VALVE_DISEASE';

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askDizzy(R, fact) || !S.dizzy) { return skip(R); }
		if (Q.askTachycardia(R, fact) || !S.tachycardia) { return skip(R); }

		// Check Other Symptoms (atleast 1) 
		var n = 0; min = 1;

		if (S.legs_swell) { n++; }
		if (S.belly_swell) { n++; }
		if (S.weakness_swell) { n++; }
		if (S.weightgain_swell) { n++; }

		if (n < min) {
			if (Q.askLegsSwell(R, fact) || !S.legs_swell) { return skip(R); }
		}
		if (n < min) {
			if (Q.askBellySwell(R, fact) || !S.belly_swell) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWeakness(R, fact) || !S.weakness) { return skip(R); }
		}
		if (n < min) {
			if (Q.askWeightgain(R, fact) || !S.weightgain) { return skip(R); }
		}
		if (n < min) { return skip(R); }

		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.VALVE_DISEASE' : 'FI.DIAGNOSE.VALVE_DISEASE';
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
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('11')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-CARDIOMYOPATHY';

		R.next();

		// Check Common Symptoms
		if (Q.askFatigue(R, fact) || !S.fatigue) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askDizzy(R, fact) || !S.dizzy) { return skip(R); }
		if (!(S.legs_swell || S.belly_swell)) {
			if (Q.askLegsSwell(R, fact)) { return skip(R); }
			if (Q.askBellySwell(R, fact)) { return skip(R); }
		}
		if (Q.askFaint(R, fact) || !S.faint) { return skip(R); }

		// Check Other Symptoms (atleast 1) 
		if (!(S.chest_pain || S.cough)) {
			if (Q.askChestPain(R, fact)) { return skip(R); }
			if (Q.askCough(R, fact)) { return skip(R); }
		}

		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.CARDIOMYOPATHY' : 'FI.DIAGNOSE.CARDIOMYOPATHY';
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
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('12')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + MYOCARDIALINFARCTION;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (!(S.fatigue || S.weakness)) {
			if (Q.askFatigue(R, fact)) { return skip(R); }
			if (Q.askWeakness(R, fact)) { return skip(R); }
		}
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (!(S.dizzy || S.nausea)) {
			if (Q.askDizzy(R, fact)) { return skip(R); }
			if (Q.askNausea(R, fact)) { return skip(R); }
		}

		// Check Other Symptoms (atleast 3)
		var n = 0, min = 3;

		if (S.pale_sweat) { n++; }
		if (S.back_pain) { n++; }
		if (S.mouth_pain) { n++; }
		if (S.neck_shoulder_pain) { n++; }
		if (S.arm_pain) { n++; }
		if (S.abdomen_pain) { n++; }
		if (S.tachycardia) { n++; }
		if (S.dysphasia) { n++; }
		if (S.heartburn) { n++; }

		if (n < min) {
			if (Q.askPaleSweat(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askDysphasia(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askBackPain(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askMouthPain(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askNeckShoulderPain(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askArmPain(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askAbdomenPain(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askTachycardia(R, fact)) { return skip(R); }
		}
		if (n < min) {
			if (Q.askHearburn(R, fact)) { return skip(R); }
		}
		if (n < min) { return skip(R); }
		
		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.' + MYOCARDIALINFARCTION : 'FI.DIAGNOSE.' + MYOCARDIALINFARCTION;
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
		const S = fact.user.symptoms;
		const G = fact.user.group;
		const A = fact.agent;

		// console.log('13')
		if (A.next_action !== '') { return R.stop(); }
		fact.agent.status = 'CHECKING-' + ANEURYSM;

		R.next();

		// Check Common Symptoms
		if (Q.askChestPain(R, fact) || !S.chest_pain) { return skip(R); }
		if (Q.askDyspnea(R, fact) || !S.dyspnea) { return skip(R); }
		if (Q.askCough(R, fact) || !S.cough) { return skip(R); }
		if (Q.askDysphasia(R, fact) || !S.dysphasia) { return skip(R); }
		if (Q.askHoarseness(R, fact) || !S.hoarseness) { return skip(R); }
		if (Q.askBackPain(R, fact) || !S.back_pain) { return skip(R); }
		
		R.when(true);
	},
	consequence: (R, fact) => {
		const S = fact.user.symptoms;
		const G = fact.user.group;

		// Event & Diagnosis
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.' + ANEURYSM : 'FI.DIAGNOSE.' + ANEURYSM;
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
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN.DIAGNOSE.UNABLE_TO_DIAGNOSE' : 'FI.DIAGNOSE.UNABLE_TO_DIAGNOSE';
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
	R.register(diagnoseArrythimia);
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
const skip = (R) => {
	R.when(false);
}