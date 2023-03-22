/*
	--- --- --- Symptom Questions --- --- ---

	'' represent NULL values (undetermined information).
	This is because Firebase does not allow storage of NULL data types.

	Ruleset for determining Agent Action during Symptom Elicitation.
*/

const askPhlegm = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (G.phlegm === '') { 
		if (S.phlegm_clear === '') {
			fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_CLEAR' : 'FI-ASK-PHLEGM_CLEAR';	
		} else if (S.phlegm_white === '') {
			fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_WHITE' : 'FI-ASK-PHLEGM_WHITE';
		} else if (S.phlegm_green === '') {
			fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_GREEN' : 'FI-ASK-PHLEGM_GREEN';
		} else if (S.phlegm_red === '') {
			fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_RED' : 'FI-ASK-PHLEGM_RED';
		}
		return true;
	}
	return false;
};

const askChestPain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.chest_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CHEST_PAIN' : 'FI-ASK-CHEST_PAIN';
		return true;
	}
	return false;
};

const askFatigue = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.fatigue === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-FATIGUE' : 'FI-ASK-FATIGUE';
		return true;
	}
	return false;
};

const askDyspnea = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.dyspnea === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-DYSPNEA' : 'FI-ASK-DYSPNEA';
		return true;
	}
	return false;
};

const askDizzy = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.dizzy === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-DIZZY' : 'FI-ASK-DIZZY';
		return true;
	}
	return false;
};

const askCough = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.cough === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-COUGH' : 'FI-ASK-COUGH';
		return true;
	}
	return false;
};

const askTachycardia = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.tachycardia === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-TACHYCARDIA' : 'FI-ASK-TACHYCARDIA';
		return true;
	}
	return false;
};

const askFever = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.fever === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-FEVER' : 'FI-ASK-FEVER';
		return true;
	}
	return false;
};

const askHeadaches = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.headaches === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-HEADACHES' : 'FI-ASK-HEADACHES';
		return true;
	}
	return false;
};

const askLegsSwell = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.legs_swell === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-LEGS_SWELL' : 'FI-ASK-LEGS_SWELL';
		return true;
	}
	return false;
};

const askPaleSweat = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.pale_sweat === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PALE_SWEAT' : 'FI-ASK-PALE_SWEAT';
		return true;
	}
	return false;
};

const askWheeze = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.wheeze === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WHEEZE' : 'FI-ASK-WHEEZE';
		return true;
	}
	return false;
};

const askBellySwell = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.belly_swell === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BELLY_SWELL' : 'FI-ASK-BELLY_SWELL';
		return true;
	}
	return false;
};

const askCyanosis = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.cyanosis === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CYANOSIS' : 'FI-ASK-CYANOSIS';
		return true;
	}
	return false;
};

const askDysphasia = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.dysphasia === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-DYSPHASIA' : 'FI-ASK-DYSPHASIA';
		return true;
	}
	return false;
};

const askFaint = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.faint === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-FAINT' : 'FI-ASK-FAINT';
		return true;
	}
	return false;
};

const askNausea = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.nausea === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NAUSEA' : 'FI-ASK-NAUSEA';
		return true;
	}
	return false;
};

const askPhlegmRed = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.phlegm_red === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_RED' : 'FI-ASK-PHLEGM_RED';
		return true;
	}
	return false;
};

const askWeakness = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.weakness === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WEAKNESS' : 'FI-ASK-WEAKNESS';
		return true;
	}
	return false;
};

const askBlurry = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.blurry === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BLURRY' : 'FI-ASK-BLURRY';
		return true;
	}
	return false;
};

const askColds = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.colds === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-COLDS' : 'FI-ASK-COLDS';
		return true;
	}
	return false;
};

const askWeightloss = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.weightloss === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WEIGHTLOSS' : 'FI-ASK-WEIGHTLOSS';
		return true;
	}
	return false;
};

const askAbdomenPain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.abdomen_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-ABDOMEN_PAIN' : 'FI-ASK-ABDOMEN_PAIN';
		return true;
	}
	return false;
};

const askAnxiety = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.anxiety === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-ANXIETY' : 'FI-ASK-ANXIETY';
		return true;
	}
	return false;
};

const askAppetiteLoss = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.appetite_loss === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-APPETITE_LOSS' : 'FI-ASK-APPETITE_LOSS';
		return true;
	}
	return false;
};

const askTachypnea = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.tachypnea === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-TACHYPNEA' : 'FI-ASK-TACHYPNEA';
		return true;
	}
	return false;
};

const askChills = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.chills === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CHILLS' : 'FI-ASK-CHILLS';
		return true;
	}
	return false;
};

const askConfusion = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.confusion === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CONFUSION' : 'FI-ASK-CONFUSION';
		return true;
	}
	return false;
};

const askHoarseness = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.hoarseness === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-HOARSENESS' : 'FI-ASK-HOARSENESS';
		return true;
	}
	return false;
};

const askPhlegmClear = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.phlegm_clear === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_CLEAR' : 'FI-ASK-PHLEGM_CLEAR';
		return true;
	}
	return false;
};

const askPhlegmGreen = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.phlegm_green === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_GREEN' : 'FI-ASK-PHLEGM_GREEN';
		return true;
	}
	return false;
};

const askPhlegmWhite = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.phlegm_white === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_WHITE' : 'FI-ASK-PHLEGM_WHITE';
		return true;
	}
	return false;
};

const askWeightgain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.weightgain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WEIGHTGAIN' : 'FI-ASK-WEIGHTGAIN';
		return true;
	}
	return false;
};

const askArmPain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.arm_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-ARM_PAIN' : 'FI-ASK-ARM_PAIN';
		return true;
	}
	return false;
};

const askBackPain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.back_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BACK_PAIN' : 'FI-ASK-BACK_PAIN';
		return true;
	}
	return false;
};

const askBonePain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.bone_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BONE_PAIN' : 'FI-ASK-BONE_PAIN';
		return true;
	}
	return false;
};

const askChestTight = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.chest_tight === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CHEST_TIGHT' : 'FI-ASK-CHEST_TIGHT';
		return true;
	}
	return false;
};

const askHeartburn = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.heartburn === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-HEARTBURN' : 'FI-ASK-HEARTBURN';
		return true;
	}
	return false;
};

const askMouthPain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.mouth_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-MOUTH_PAIN' : 'FI-ASK-MOUTH_PAIN';
		return true;
	}
	return false;
};

const askMusclePain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.muscle_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-MUSCLE_PAIN' : 'FI-ASK-MUSCLE_PAIN';
		return true;
	}
	return false;
};

const askNeckShoulderPain = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.neck_shoulder_pain === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NECK_SHOULDER_PAIN' : 'FI-ASK-NECK_SHOULDER_PAIN';
		return true;
	}
	return false;
};

const askNeckSwell = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.neck_swell === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NECK_SWELL' : 'FI-ASK-NECK_SWELL';
		return true;
	}
	return false;
};

const askNeckTight = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.neck_tight === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NECK_TIGHT' : 'FI-ASK-NECK_TIGHT';
		return true;
	}
	return false;
};

const askRInfections = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.r_infections === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-R_INFECTIONS' : 'FI-ASK-R_INFECTIONS';
		return true;
	}
	return false;
};

const askSleepHard = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.sleep_hard === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-SLEEP_HARD' : 'FI-ASK-SLEEP_HARD';
		return true;
	}
	return false;
};

const askUrineBlood = (R, fact) => {
	const S = fact.user.symptoms;
	const G = fact.user.group;

	if (S.urine_blood === '') {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-URINE_BLOOD' : 'FI-ASK-URINE_BLOOD';
		return true;
	}
	return false;
};

module.exports = {
	askPhlegm,
	askChestPain,
	askFatigue,
	askDyspnea,
	askDizzy,
	askCough,
	askTachycardia,
	askFever,
	askHeadaches,
	askLegsSwell,
	askPaleSweat,
	askWheeze,
	askBellySwell,
	askCyanosis,
	askDysphasia,
	askFaint,
	askNausea,
	askPhlegmRed,
	askWeakness,
	askBlurry,
	askColds,
	askWeightloss,
	askAbdomenPain,
	askAnxiety,
	askAppetiteLoss,
	askTachypnea,
	askChills,
	askConfusion,
	askHoarseness,
	askPhlegmClear,
	askPhlegmGreen,
	askPhlegmWhite,
	askWeightgain,
	askArmPain,
	askBackPain,
	askBonePain,
	askChestTight,
	askHeartburn,
	askMouthPain,
	askMusclePain,
	askNeckShoulderPain,
	askNeckSwell,
	askNeckTight,
	askRInfections,
	askSleepHard,
	askUrineBlood,
	askPhlegm,
	askChestPain
};