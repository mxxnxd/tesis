const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
const ff = require('./fullfilment');



const ff_test = require('./fulfillment/test.js');
const ff_lang = require('./fulfillment/language.js');
const ff_term = require('./fulfillment/terms.js');


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


	intentMap.set('en.start.checkup', ff.en_start_checkup);
	intentMap.set('en.get.symptom.yes', ff.en_get_symptom_yes);
	intentMap.set('en.get.symptom.no', ff.en_get_symptom_no);

	agent.handleRequest(intentMap);
});

app.listen(3000, () => {
	console.log("Webhook server is online!");
});