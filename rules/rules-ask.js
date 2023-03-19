const ask_chest_pain = {
	priority: 13,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.chest_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CHEST_PAIN' : 'FI-ASK-CHEST_PAIN';
		R.stop();
	}
};

const ask_fatigue = {
	priority: 13,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fatigue === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-FATIGUE' : 'FI-ASK-FATIGUE';
		R.stop();
	}
};

const ask_dyspnea = {
	priority: 12,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.dyspnea === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-DYSPNEA' : 'FI-ASK-DYSPNEA';
		R.stop();
	}
};

const ask_dizzy = {
	priority: 9,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.dizzy === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-DIZZY' : 'FI-ASK-DIZZY';
		R.stop();
	}
};

const ask_cough = {
	priority: 8,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cough === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-COUGH' : 'FI-ASK-COUGH';
		R.stop();
	}
};

const ask_tachycardia = {
	priority: 8,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.tachycardia === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-TACHYCARDIA' : 'FI-ASK-TACHYCARDIA';
		R.stop();
	}
};

const ask_fever = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fever === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-FEVER' : 'FI-ASK-FEVER';
		R.stop();
	}
};

const ask_headaches = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.headaches === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-HEADACHES' : 'FI-ASK-HEADACHES';
		R.stop();
	}
};

const ask_legs_swell = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.legs_swell === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-LEGS_SWELL' : 'FI-ASK-LEGS_SWELL';
		R.stop();
	}
};

const ask_pale_sweat = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pale_sweat === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PALE_SWEAT' : 'FI-ASK-PALE_SWEAT';
		R.stop();
	}
};

const ask_wheeze = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.wheeze === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WHEEZE' : 'FI-ASK-WHEEZE';
		R.stop();
	}
};

const ask_belly_swell = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.belly_swell === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BELLY_SWELL' : 'FI-ASK-BELLY_SWELL';
		R.stop();
	}
};

const ask_cyanosis = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cyanosis === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CYANOSIS' : 'FI-ASK-CYANOSIS';
		R.stop();
	}
};

const ask_dysphasia = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.dysphasia === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-DYSPHASIA' : 'FI-ASK-DYSPHASIA';
		R.stop();
	}
};

const ask_faint = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.faint === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-FAINT' : 'FI-ASK-FAINT';
		R.stop();
	}
};

const ask_nausea = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.nausea === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NAUSEA' : 'FI-ASK-NAUSEA';
		R.stop();
	}
};

const ask_phlegm_red = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_red === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_RED' : 'FI-ASK-PHLEGM_RED';
		R.stop();
	}
};

const ask_weakness = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.weakness === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WEAKNESS' : 'FI-ASK-WEAKNESS';
		R.stop();
	}
};

const ask_blurry = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.blurry === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BLURRY' : 'FI-ASK-BLURRY';
		R.stop();
	}
};

const ask_colds = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.colds === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-COLDS' : 'FI-ASK-COLDS';
		R.stop();
	}
};

const ask_weightloss = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.weightloss === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WEIGHTLOSS' : 'FI-ASK-WEIGHTLOSS';
		R.stop();
	}
};

const ask_abdomen_pain = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.abdomen_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-ABDOMEN_PAIN' : 'FI-ASK-ABDOMEN_PAIN';
		R.stop();
	}
};

const ask_anxiety = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.anxiety === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-ANXIETY' : 'FI-ASK-ANXIETY';
		R.stop();
	}
};

const ask_appetite_loss = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.appetite_loss === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-APPETITE_LOSS' : 'FI-ASK-APPETITE_LOSS';
		R.stop();
	}
};

const ask_tachypnea = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.tachypnea === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-TACHYPNEA' : 'FI-ASK-TACHYPNEA';
		R.stop();
	}
};

const ask_chills = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.chills === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CHILLS' : 'FI-ASK-CHILLS';
		R.stop();
	}
};

const ask_confusion = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.confusion === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CONFUSION' : 'FI-ASK-CONFUSION';
		R.stop();
	}
};

const ask_hoarseness = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.hoarseness === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-HOARSENESS' : 'FI-ASK-HOARSENESS';
		R.stop();
	}
};

const ask_phlegm_clear = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_clear === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_CLEAR' : 'FI-ASK-PHLEGM_CLEAR';
		R.stop();
	}
};

const ask_phlegm_green = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_green === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_GREEN' : 'FI-ASK-PHLEGM_GREEN';
		R.stop();
	}
};

const ask_phlegm_white = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_white === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-PHLEGM_WHITE' : 'FI-ASK-PHLEGM_WHITE';
		R.stop();
	}
};

const ask_weightgain = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.weightgain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-WEIGHTGAIN' : 'FI-ASK-WEIGHTGAIN';
		R.stop();
	}
};

const ask_arm_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.arm_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-ARM_PAIN' : 'FI-ASK-ARM_PAIN';
		R.stop();
	}
};

const ask_back_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.back_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BACK_PAIN' : 'FI-ASK-BACK_PAIN';
		R.stop();
	}
};

const ask_bone_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.bone_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-BONE_PAIN' : 'FI-ASK-BONE_PAIN';
		R.stop();
	}
};

const ask_chest_tight = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.chest_tight === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-CHEST_TIGHT' : 'FI-ASK-CHEST_TIGHT';
		R.stop();
	}
};

const ask_heartburn = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.heartburn === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-HEARTBURN' : 'FI-ASK-HEARTBURN';
		R.stop();
	}
};

const ask_mouth_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.mouth_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-MOUTH_PAIN' : 'FI-ASK-MOUTH_PAIN';
		R.stop();
	}
};

const ask_muscle_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.muscle_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-MUSCLE_PAIN' : 'FI-ASK-MUSCLE_PAIN';
		R.stop();
	}
};

const ask_neck_shoulder_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.neck_shoulder_pain === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NECK_SHOULDER_PAIN' : 'FI-ASK-NECK_SHOULDER_PAIN';
		R.stop();
	}
};

const ask_neck_swell = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.neck_swell === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NECK_SWELL' : 'FI-ASK-NECK_SWELL';
		R.stop();
	}
};

const ask_neck_tight = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.neck_tight === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-NECK_TIGHT' : 'FI-ASK-NECK_TIGHT';
		R.stop();
	}
};

const ask_r_infections = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.r_infections === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-R_INFECTIONS' : 'FI-ASK-R_INFECTIONS';
		R.stop();
	}
};

const ask_sleep_hard = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.sleep_hard === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-SLEEP_HARD' : 'FI-ASK-SLEEP_HARD';
		R.stop();
	}
};

const ask_urine_blood = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.urine_blood === '');
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'ENGLISH') ? 'EN-ASK-URINE_BLOOD' : 'FI-ASK-URINE_BLOOD';
		R.stop();
	}
};

const applyRules = (R) => {
	R.register(ask_abdomen_pain);
	R.register(ask_anxiety);
	R.register(ask_appetite_loss);
	R.register(ask_arm_pain);
	R.register(ask_back_pain);
	R.register(ask_belly_swell);
	R.register(ask_blurry);
	R.register(ask_bone_pain);
	R.register(ask_tachypnea);
	R.register(ask_chest_pain);
	R.register(ask_chest_tight);
	R.register(ask_chills);
	R.register(ask_colds);
	R.register(ask_confusion);
	R.register(ask_cough);
	R.register(ask_cyanosis);
	R.register(ask_dizzy);
	R.register(ask_dysphasia);
	R.register(ask_dyspnea);
	R.register(ask_faint);
	R.register(ask_fatigue);
	R.register(ask_fever);
	R.register(ask_headaches);
	R.register(ask_heartburn);
	R.register(ask_hoarseness);
	R.register(ask_legs_swell);
	R.register(ask_mouth_pain);
	R.register(ask_muscle_pain);
	R.register(ask_nausea);
	R.register(ask_neck_shoulder_pain);
	R.register(ask_neck_swell);
	R.register(ask_neck_tight);
	R.register(ask_pale_sweat);
	R.register(ask_phlegm_clear);
	R.register(ask_phlegm_green);
	R.register(ask_phlegm_red);
	R.register(ask_phlegm_white);
	R.register(ask_r_infections);
	R.register(ask_sleep_hard);
	R.register(ask_tachycardia);
	R.register(ask_urine_blood);
	R.register(ask_weakness);
	R.register(ask_weightgain);
	R.register(ask_weightloss);
	R.register(ask_wheeze);
};

module.exports = {
	applyRules
};