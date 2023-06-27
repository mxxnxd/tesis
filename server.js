// Libraries
const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');

// Fulfillment Handlers
const ffWebhook = require('./fulfillment/webhook.js');
const ffLanguage = require('./fulfillment/language.js');
const ffStart = require('./fulfillment/start.js');
const ffCheckup = require('./fulfillment/checkup.js');
const ffQuery = require('./fulfillment/query.js');

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

	intentMap.set('en.user.share.symptom.positive', ffCheckup.enShareSymptomPositive);
	intentMap.set('en.user.confirm.symptom', ffCheckup.enConfirmSymptom);
	intentMap.set('en.user.share.symptom.negative', ffCheckup.enShareSymptomNegative);
	intentMap.set('en.user.share.feeling', ffCheckup.enShareFeeling);

	intentMap.set('en.user.share.blood_pressure', ffCheckup.enShareBloodPressure);
	intentMap.set('en.user.share.gender', ffCheckup.enShareGender);
	intentMap.set('en.user.share.age', ffCheckup.enShareAge);
	intentMap.set('en.user.share.weight', ffCheckup.enShareWeight);

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

	// Handle Fulfillment
	agent.handleRequest(intentMap);
});

// Start
app.listen(3000, () => {
	console.log("CHATBOT WEBSERVER IS ONLINE!");
});