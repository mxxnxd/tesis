const dfff = require('dialogflow-fulfillment');

const webhook = (agent) => {
	agent.add("Webhook reply :)!");
};

const en_get_language = async (agent) => {
	console.log(agent.parameters);

	// TODO STORE IN USER DATABASE

	setContexts(agent, ['introduction', 'test'], [3, 3]);
	agent.add('I see your selected language :)');
};

/*
	Utility function for setting multiple contexts
*/
const setContexts = (agent, contexts, lifespan) => {
	contexts.forEach((context, index) => {
		agent.context.set({
			name: context,
			lifespan: lifespan[index]
		});
	});
};

module.exports = {
	webhook,
	en_get_language
};
