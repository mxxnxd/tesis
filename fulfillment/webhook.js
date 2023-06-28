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

	// console.log(agent.alternativeQueryResults);
	console.log(agent.request_.body.queryResult.languageCode);
	// console.log(agent);

	console.log(agent.request_.body.session.split('/')[4]);

	console.log(agent.parameters);
	//

	if (util.getLanguageCode(agent) === 'en') {
		agent.add("GOOD MORNING");
	} 

	if (util.getLanguageCode(agent) === 'fil') {
		agent.add('MAGANDANG UMAGA');
	}
	
	agent.add("WOW");
};

module.exports = {
	dvWebhook
};