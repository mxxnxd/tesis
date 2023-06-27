const util = require('./utility.js');
const { Payload } = require('dialogflow-fulfillment');

/*
	Webhook Functions: Test Intents
*/

/* ========== ========== ========== ========== ========== ========== ========== */



/* ========== ========== ========== ========== ========== ========== ========== */
const fs = require('fs');

const jsonData = fs.readFileSync('./fulfillment/agent-checkup-dialogue.json', 'utf8');
const responses = JSON.parse(jsonData);

const dvWebhook = async (agent) => {

	const body_subject = agent.parameters.body_subject;
	const body_condition = agent.parameters.body_condition_temp;

	console.log([body_subject, body_condition]);

	console.log(util.extractSymptomFromKeywords(body_subject, body_condition));
	agent.add('Webhook!');
};

module.exports = {
	dvWebhook
};