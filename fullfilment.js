const dfff = require('dialogflow-fulfillment');

const dv_webhook = (agent) => {

	// User ID
	console.log(agent.request_.body.originalDetectIntentRequest.payload.data);
	agent.add("Webhook!");
};

/* ========== ========== ========== ========== ========== ========== ========== */
let SELECTED_LANGUAGE = 'ENGLISH';
let SELECTED_SYMPTOM = 'SHORT-BREATH';

/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_language = async (agent) => {
	SELECTED_LANGUAGE = agent.parameters.language;
	setContexts(agent, ['PH-INTRO', 'CX-CFM-LANG'], [3, 3]);
	agent.add(`Great! I see your selected language is ${agent.parameters.language} am I correct?`);
};

const en_get_language_yes = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC

	setContexts(agent, ['PH-CHECK', 'CX-GET-SYMP'], [3, 3]);
	agent.add('Your selected language is confirmed!');
};

const en_get_language_no = async (agent) => {	
	triggerEvent(agent, 'EN-ASK-LANGUAGE-RETRY');
};

/* ========== ========== ========== ========== ========== ========== ========== */

const en_start_checkup = async (agent) => {

	console.log('WHAT');

	// TODO: KNOWLEDGE BASE LOGIC (DETERMINE NEW USER)
	let rng = Math.random() < 0.5;
	rng = true;

	if (rng) {
		// Ask User for preferred language
		triggerEvent(agent, 'EN-ASK-LANGUAGE');

	} else {
		setContexts(agent, ['PH-CHECK', 'CX-GET-SYMP'], [3, 2]);
		agent.add('Alright! Lets get to it then!');
		agent.add('Have you been feeling well?.');
	}
};

/* ========== ========== ========== ========== ========== ========== ========== */

const en_get_symptom_yes = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC

	agent.add('YES');
};

const en_get_symptom_no = async (agent) => {

	// TODO: KNOWLEDGE BASE LOGIC

	agent.add('NO');
};

/*
	Utility function for setting multiple contexts
*/
const setContexts = (agent, contexts, lifespan) => {
	contexts.forEach((context, index) => {
		agent.context.set({
			name: context,
			lifespan: lifespan[index]
		});
	});
};

const triggerEvent = (agent, name) => {
	agent.add('.');
	agent.setFollowupEvent(name);
};

module.exports = {
	dv_webhook,
	en_get_language,
	en_get_language_yes,
	en_get_language_no,
	en_start_checkup,
	en_get_symptom_yes,
	en_get_symptom_no
};
