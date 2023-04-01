const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');

const ff_test = require('./fulfillment/test.js');
const ff_lang = require('./fulfillment/language.js');
const ff_term = require('./fulfillment/terms.js');
const ff_start = require('./fulfillment/start.js');
const ff_symp = require('./fulfillment/symptoms.js');
const ff_query = require('./fulfillment/question.js');
const ff_diag = require('./fulfillment/diagnose.js');

app.post('/webhook', express.json(), (req, res) => {
	// Instantiate Agent
	const agent = new dfff.WebhookClient({
		request : req,
		response: res
	});

	// Map Intent Handlers
	var intentMap = new Map();
	intentMap.set('dv.webhook', ff_test.dv_webhook);

	intentMap.set('en.get.language', ff_lang.en_get_language);
	intentMap.set('en.get.language.yes', ff_lang.en_get_language_yes);
	intentMap.set('en.get.language.no', ff_lang.en_get_language_no);

	intentMap.set('en.get.terms.yes', ff_term.en_get_terms_yes);
	intentMap.set('en.get.terms.no', ff_term.en_get_terms_no);

	intentMap.set('en.start.checkup', ff_start.en_start_checkup);
	intentMap.set('en.start.question', ff_start.en_start_question);

	intentMap.set('en.get.symptom', ff_symp.en_get_symptom);
	intentMap.set('en.get.symptom.yes', ff_symp.en_get_symptom_yes);
	intentMap.set('en.get.symptom.no', ff_symp.en_get_symptom_no);

	intentMap.set('en.get.question', ff_query.en_get_question);

	intentMap.set('en.diagnose.copd', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.asthma', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.pneumonia', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.lung_cancer', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.tuberculosis', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.heart_failure', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.hyptertension', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.coronary_artery_disease', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.arrhythmia', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.valve_disease', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.cardiomyopathy', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.myocardial_infarction', ff_diag.en_start_diagnose);
	intentMap.set('en.diagnose.aneurysm', ff_diag.en_start_diagnose);

	intentMap.set('en.give.diagnose', ff_diag.en_give_diagnose);
	
	agent.handleRequest(intentMap);
});

app.listen(3000, () => {
	console.log("Webhook server is online!");
});