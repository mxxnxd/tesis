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

	const action = 'ASK-DYSPHASIA';

	console.log('Webhook!');
	const response = responses[action.toLowerCase().split('-')[1]].ask_symptom;
	console.log(response[Math.floor(Math.random() * response.length)])
	agent.add('Webhook!');
};

module.exports = {
	dvWebhook
};