const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
const ff = require('./fullfilment');

app.post('/webhook', express.json(), (req, res) => {
	// Instantiate Agent
	const agent = new dfff.WebhookClient({
		request : req,
		response: res
	});

	// Map Intent Handlers
	var intentMap = new Map();
	intentMap.set('en.get.language', ff.en_get_language);

	try {
		agent.handleRequest(intentMap);
	} catch (err) {
		console.log("Fullfilment Error...");
	};
});

app.listen(3000, () => {
	console.log("Webhook server is online!");
});