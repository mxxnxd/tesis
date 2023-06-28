// Libraries
const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
const intent = require('./intents/intent-manager.js');
const axios = require('axios');
require('dotenv').config();

// Fulfillment Handlers
const ffWebhook = require('./fulfillment/webhook.js');
const ffLanguage = require('./fulfillment/language.js');
const ffStart = require('./fulfillment/start.js');
const ffCheckup = require('./fulfillment/checkup.js');
const ffQuery = require('./fulfillment/query.js');

// Routes
app.get('/webhook/messenger', function(req, res) {
	// Verifies Webhook Setup (Messenger)
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        console.log(":> Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error(">: Webhook validation failed...");
        res.sendStatus(403);
    }
});

app.post('/webhook/messenger', express.json(), (req, res) => {
    const data = req.body;

	// MIGHT BREAK?
	const info = data.entry[0].messaging;

	handleMessengerInput(info[0].sender.id, info[0].message.text);
	res.sendStatus(200);
});

app.post('/webhook/dialogflow', express.json(), (req, res) => {
	// Instantiate Agent
	const agent = new dfff.WebhookClient({
		request : req,
		response: res
	});

	// Map Intent Handlers
	var intentMap = new Map();
	intentMap.set('dv.webhook', ffWebhook.dvWebhook); 					// Test Intent (Dev)

	// intentMap.set('en.user.share.symptom.positive', ffCheckup.enShareSymptomPositive);
	// intentMap.set('en.user.confirm.symptom', ffCheckup.enConfirmSymptom);
	// intentMap.set('en.user.share.symptom.negative', ffCheckup.enShareSymptomNegative);
	// intentMap.set('en.user.share.feeling', ffCheckup.enShareFeeling);

	// intentMap.set('en.user.share.blood_pressure', ffCheckup.enShareBloodPressure);
	// intentMap.set('en.user.share.gender', ffCheckup.enShareGender);
	// intentMap.set('en.user.share.age', ffCheckup.enShareAge);
	// intentMap.set('en.user.share.weight', ffCheckup.enShareWeight);

	intentMap.set('en.user.query.disease.cause', ffQuery.enQueryDiseaseCause);
	intentMap.set('en.user.query.disease.definition', ffQuery.enQueryDiseaseDefinition);
	intentMap.set('en.user.query.disease.symptom', ffQuery.enQueryDiseaseSymptom);
	intentMap.set('en.user.query.disease.treatment', ffQuery.enQueryDiseaseTreatment);
	intentMap.set('en.user.query.symptom.definition', ffQuery.enQuerySymptomDefinition);

	// Overhauled
	intentMap.set('en.user.start.greet', ffStart.enUserStartGreet);
	intentMap.set('en.user.start.checkup', ffStart.enUserStartCheckup);
	intentMap.set('en.user.start.query', ffStart.enUserStartQuery);

	intentMap.set('en.user.confirm.intro', ffLanguage.enUserConfirmIntro);
	intentMap.set('en.user.choose.language', ffLanguage.enUserChooseLanguage);
	intentMap.set('en.user.confirm.language', ffLanguage.enUserConfirmLanguage);
	intentMap.set('en.user.confirm.terms', ffLanguage.enUserConfirmTerms);

	intentMap.set('en.user.share.symptom.parts.yes', ffCheckup.enUserShareSymptomPartYes);
	intentMap.set('en.user.share.symptom.parts.no', ffCheckup.enUserShareSymptomPartNo);
	intentMap.set('en.user.share.symptom.yes', ffCheckup.enUserShareSymptomYes);
	intentMap.set('en.user.share.symptom.no', ffCheckup.enUserShareSymptomNo);
	intentMap.set('en.user.confirm.symptom', ffCheckup.enUserConfirmSymptom);

	// Handle Fulfillment
	agent.handleRequest(intentMap);
});

// Start
app.listen(3000, () => {
	console.log("CHATBOT WEBSERVER IS ONLINE!");
});

async function handleMessengerInput(id, message) {
	// Fetch User
	// TODO: LOGIC FOR LANGUAGE SWITCH

	// Dialogflow Fulfillment
	console.log([id, message]);
	const response = await intent.detectIntent('en', message, id);
	const fulfillment_messages = response[0].queryResult.fulfillmentMessages;

	// Response
	await sendMessages(id, fulfillment_messages);
};

async function sendMessages(id, messages) {
	const accessToken = process.env.PAGE_ACCESS_TOKEN;
	for (i = 0; i < messages.length; i++) {
		const message = messages[i].text.text[0];
		try {
			const response = await axios.post(
			  `https://graph.facebook.com/v15.0/me/messages?access_token=${accessToken}`,
			  {
				messaging_type: 'RESPONSE',
				recipient: {
				  id: id
				},
				message: {
				  text: message
				}
			  }
			);
			// console.log('Message sent:', response.data);
		} catch (error) {
		console.error('Error sending message:', error);
		}
	}
};