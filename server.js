// Libraries
const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');

// Fulfillment Handlers
const ffWebhook = require('./fulfillment/webhook.js');
const ffLanguage = require('./fulfillment/language.js');
const ffStart = require('./fulfillment/start.js');

// Routes
app.post('/webhook', express.json(), (req, res) => {
	// Instantiate Agent
	const agent = new dfff.WebhookClient({
		request : req,
		response: res
	});

	// Map Intent Handlers
	var intentMap = new Map();
	intentMap.set('dv.webhook', ffWebhook.dvWebhook); 					// Test Intent (Dev)

	intentMap.set('en.user.command.checkup', ffStart.enCommandCheckup);
	intentMap.set('en.user.command.query', ffStart.enCommandQuery);

	intentMap.set('en.user.confirm.intro_start', ffLanguage.enConfirmIntroStart);
	intentMap.set('en.user.confirm.language', ffLanguage.enConfirmLanguage);
	intentMap.set('en.user.choose.language', ffLanguage.enChooseLanguage);
	intentMap.set('en.user.confirm.terms', ffLanguage.enConfirmTerms);


	// Handle Fulfillment
	agent.handleRequest(intentMap);
});

// Start
app.listen(3000, () => {
	console.log("CHATBOT WEBSERVER IS ONLINE!");
});