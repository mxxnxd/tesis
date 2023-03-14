const ask_abdomen_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.abdomen_pain == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.ABDOMEN_PAIN' : 'FI.ASK.ABDOMEN_PAIN';
		R.stop();
	}
};

const ask_anxiety = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.anxiety == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.ANXIETY' : 'FI.ASK.ANXIETY';
		R.stop();
	}
};

const ask_appetite_Loss = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.appetite_Loss == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.APPETITE_LOSS' : 'FI.ASK.APPETITE_LOSS';
		R.stop();
	}
};

const ask_blurry = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.blurry == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.BLURRY' : 'FI.ASK.BLURRY';
		R.stop();
	}
};

const ask_bone_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.bone_pain == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.BONE_PAIN' : 'FI.ASK.BONE_PAIN';
		R.stop();
	}
};

const ask_breath_rapid = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.breath_rapid == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.BREATH_RAPID' : 'FI.ASK.BREATH_RAPID';
		R.stop();
	}
};

const ask_breath_short = {
	priority: 12,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.breath_short == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.BREATH_SHORT' : 'FI.ASK.BREATH_SHORT';
		R.stop();
	}
};

const ask_chest_pain = {
	priority: 13,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.chest_pain == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.CHEST_PAIN' : 'FI.ASK.CHEST_PAIN';
		R.stop();
	}
};

const ask_chest_tight = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.chest_tight == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.CHEST_TIGHT' : 'FI.ASK.CHEST_TIGHT';
		R.stop();
	}
};

const ask_chills = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.chills == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.CHILLS' : 'FI.ASK.CHILLS';
		R.stop();
	}
};

const ask_colds = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.colds == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.COLDS' : 'FI.ASK.COLDS';
		R.stop();
	}
};

const ask_colds_long = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.colds_long == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.COLDS_LONG' : 'FI.ASK.COLDS_LONG';
		R.stop();
	}
};

const ask_confusion = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.confusion == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.CONFUSION' : 'FI.ASK.CONFUSION';
		R.stop();
	}
};

const ask_cough = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cough == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.COUGH' : 'FI.ASK.COUGH';
		R.stop();
	}
};

const ask_cough_blood = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cough_blood == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.COUGH_BLOOD' : 'FI.ASK.COUGH_BLOOD';
		R.stop();
	}
};

const ask_cough_hard = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cough_hard == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.COUGH_HARD' : 'FI.ASK.COUGH_HARD';
		R.stop();
	}
};

const ask_cough_long = {
	priority: 7,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cough_long == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.COUGH_LONG' : 'FI.ASK.COUGH_LONG';
		R.stop();
	}
};

const ask_cyanosis = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.cyanosis == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.CYANOSIS' : 'FI.ASK.CYANOSIS';
		R.stop();
	}
};

const ask_dizzy = {
	priority: 9,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.dizzy == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.DIZZY' : 'FI.ASK.DIZZY';
		R.stop();
	}
};

const ask_faint = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.faint == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.FAINT' : 'FI.ASK.FAINT';
		R.stop();
	}
};

const ask_fatigue = {
	priority: 13,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fatigue == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.FATIGUE' : 'FI.ASK.FATIGUE';
		R.stop();
	}
};

const ask_fever = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fever == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.FEVER' : 'FI.ASK.FEVER';
		R.stop();
	}
};

const ask_fever_high = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.fever_high == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.FEVER_HIGH' : 'FI.ASK.FEVER_HIGH';
		R.stop();
	}
};

const ask_headaches = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.headaches == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.HEADACHES' : 'FI.ASK.HEADACHES';
		R.stop();
	}
};

const ask_heart_rapid = {
	priority: 8,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.heart_rapid == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.HEART_RAPID' : 'FI.ASK.HEART_RAPID';
		R.stop();
	}
};

const ask_heartburn = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.heartburn == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.HEARTBURN' : 'FI.ASK.HEARTBURN';
		R.stop();
	}
};

const ask_hoarseness = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.hoarseness == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.HOARSENESS' : 'FI.ASK.HOARSENESS';
		R.stop();
	}
};

const ask_muscle_pain = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.muscle_pain == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.MUSCLE_PAIN' : 'FI.ASK.MUSCLE_PAIN';
		R.stop();
	}
};

const ask_nausea = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.nausea == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.NAUSEA' : 'FI.ASK.NAUSEA';
		R.stop();
	}
};

const ask_neck_tight = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.neck_tight == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.NECK_TIGHT' : 'FI.ASK.NECK_TIGHT';
		R.stop();
	}
};

const ask_pain_arm = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_arm == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_ARM' : 'FI.ASK.PAIN_ARM';
		R.stop();
	}
};

const ask_pain_back = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_back == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_BACK' : 'FI.ASK.PAIN_BACK';
		R.stop();
	}
};

const ask_pain_belly = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_belly == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_BELLY' : 'FI.ASK.PAIN_BELLY';
		R.stop();
	}
};

const ask_pain_jaw = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_jaw == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_JAW' : 'FI.ASK.PAIN_JAW';
		R.stop();
	}
};

const ask_pain_neck = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_neck == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_NECK' : 'FI.ASK.PAIN_NECK';
		R.stop();
	}
};

const ask_pain_shoulder = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_shoulder == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_SHOULDER' : 'FI.ASK.PAIN_SHOULDER';
		R.stop();
	}
};

const ask_pain_teeth = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_teeth == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_TEETH' : 'FI.ASK.PAIN_TEETH';
		R.stop();
	}
};

const ask_pain_throat = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pain_throat == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PAIN_THROAT' : 'FI.ASK.PAIN_THROAT';
		R.stop();
	}
};

const ask_pale = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.pale == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PALE' : 'FI.ASK.PALE';
		R.stop();
	}
};

const ask_phlegm_clear = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_clear == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PHLEGM_CLEAR' : 'FI.ASK.PHLEGM_CLEAR';
		R.stop();
	}
};

const ask_phlegm_green = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_green == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PHLEGM_GREEN' : 'FI.ASK.PHLEGM_GREEN';
		R.stop();
	}
};

const ask_phlegm_red = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_red == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PHLEGM_RED' : 'FI.ASK.PHLEGM_RED';
		R.stop();
	}
};

const ask_phlegm_white = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_white == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PHLEGM_WHITE' : 'FI.ASK.PHLEGM_WHITE';
		R.stop();
	}
};

const ask_phlegm_yellow = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.phlegm_yellow == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.PHLEGM_YELLOW' : 'FI.ASK.PHLEGM_YELLOW';
		R.stop();
	}
};

const ask_r_infections = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.r_infections == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.R_INFECTIONS' : 'FI.ASK.R_INFECTIONS';
		R.stop();
	}
};

const ask_sleep_hard = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.sleep_hard == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SLEEP_HARD' : 'FI.ASK.SLEEP_HARD';
		R.stop();
	}
};

const ask_smoking = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.smoking == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SMOKING' : 'FI.ASK.SMOKING';
		R.stop();
	}
};

const ask_swallow_hard = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.swallow_hard == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWALLOW_HARD' : 'FI.ASK.SWALLOW_HARD';
		R.stop();
	}
};

const ask_sweating_cold = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.sweating_cold == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWEATING_COLD' : 'FI.ASK.SWEATING_COLD';
		R.stop();
	}
};

const ask_swell_ankle = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.swell_ankle == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWELL_ANKLE' : 'FI.ASK.SWELL_ANKLE';
		R.stop();
	}
};

const ask_swell_belly = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.swell_belly == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWELL_BELLY' : 'FI.ASK.SWELL_BELLY';
		R.stop();
	}
};

const ask_swell_feet = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.swell_feet == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWELL_FEET' : 'FI.ASK.SWELL_FEET';
		R.stop();
	}
};

const ask_swell_legs = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.swell_legs == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWELL_LEGS' : 'FI.ASK.SWELL_LEGS';
		R.stop();
	}
};

const ask_swell_neck = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.swell_neck == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.SWELL_NECK' : 'FI.ASK.SWELL_NECK';
		R.stop();
	}
};

const ask_throat_clear = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.throat_clear == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.THROAT_CLEAR' : 'FI.ASK.THROAT_CLEAR';
		R.stop();
	}
};

const ask_urine_blood = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.urine_blood == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.URINE_BLOOD' : 'FI.ASK.URINE_BLOOD';
		R.stop();
	}
};

const ask_weakness = {
	priority: 5,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.weakness == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.WEAKNESS' : 'FI.ASK.WEAKNESS';
		R.stop();
	}
};

const ask_weightgain = {
	priority: 3,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.weightgain == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.WEIGHTGAIN' : 'FI.ASK.WEIGHTGAIN';
		R.stop();
	}
};

const ask_weightloss = {
	priority: 4,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.weightloss == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.WEIGHTLOSS' : 'FI.ASK.WEIGHTLOSS';
		R.stop();
	}
};

const ask_wheeze = {
	priority: 6,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.wheeze == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.WHEEZE' : 'FI.ASK.WHEEZE';
		R.stop();
	}
};

const ask_wheeze_hard = {
	priority: 2,
	condition: (R, fact) => {
		R.when(fact.user.symptoms.wheeze_hard == null);
	},
	consequence: (R, fact) => {
		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.WHEEZE_HARD' : 'FI.ASK.WHEEZE_HARD';
		R.stop();
	}
};

const applyRules = (R) => {
	R.register(ask_abdomen_pain);
	R.register(ask_anxiety);
	R.register(ask_appetite_Loss);
	R.register(ask_blurry);
	R.register(ask_bone_pain);
	R.register(ask_breath_rapid);
	R.register(ask_breath_short);
	R.register(ask_chest_pain);
	R.register(ask_chest_tight);
	R.register(ask_chills);
	R.register(ask_colds);
	R.register(ask_colds_long);
	R.register(ask_confusion);
	R.register(ask_cough);
	R.register(ask_cough_blood);
	R.register(ask_cough_hard);
	R.register(ask_cough_long);
	R.register(ask_cyanosis);
	R.register(ask_dizzy);
	R.register(ask_faint);
	R.register(ask_fatigue);
	R.register(ask_fever);
	R.register(ask_fever_high);
	R.register(ask_headaches);
	R.register(ask_heart_rapid);
	R.register(ask_heartburn);
	R.register(ask_hoarseness);
	R.register(ask_muscle_pain);
	R.register(ask_nausea);
	R.register(ask_neck_tight);
	R.register(ask_pain_arm);
	R.register(ask_pain_back);
	R.register(ask_pain_belly);
	R.register(ask_pain_jaw);
	R.register(ask_pain_neck);
	R.register(ask_pain_shoulder);
	R.register(ask_pain_teeth);
	R.register(ask_pain_throat);
	R.register(ask_pale);
	R.register(ask_phlegm_clear);
	R.register(ask_phlegm_green);
	R.register(ask_phlegm_red);
	R.register(ask_phlegm_white);
	R.register(ask_phlegm_yellow);
	R.register(ask_r_infections);
	R.register(ask_sleep_hard);
	R.register(ask_smoking);
	R.register(ask_swallow_hard);
	R.register(ask_sweating_cold);
	R.register(ask_swell_ankle);
	R.register(ask_swell_belly);
	R.register(ask_swell_feet);
	R.register(ask_swell_legs);
	R.register(ask_swell_neck);
	R.register(ask_throat_clear);
	R.register(ask_urine_blood);
	R.register(ask_weakness);
	R.register(ask_weightgain);
	R.register(ask_weightloss);
	R.register(ask_wheeze);
	R.register(ask_wheeze_hard);
};

module.exports = {
	applyRules
};


// const askShortBreath = {
// 	priority: 1,
// 	condition: (R, fact) => {
// 		R.when(fact.user.symptoms.fever == null);
// 	},
// 	consequence: (R, fact) => {
// 		fact.agent.next_action = (fact.user.language === 'EN') ? 'EN.ASK.FEVER' : 'FI.ASK.FEVER';
// 		R.stop();
// 	}
// };