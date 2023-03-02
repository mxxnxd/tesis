const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');

app.post('/webhook', express.json(), (req, res) => {
	// Instantiate Agent
	const agent = new dfff.WebhookClient({
		request : req,
		response: res
	});

	// // Map Intents
	// var intentMap = new Map()
	// intentMap.set('webhook', webhookStart)
	// intentMap.set('webhook.reply.yes', webhookReplyYes)
	// intentMap.set('webhook.reply.no', webhookReplyNo)
	// agent.handleRequest(intentMap);
});

app.listen(3000, () => {
	console.log("Webhook server is online!");
});