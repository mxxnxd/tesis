const fs = require('fs');
const util = require('./utility.js');
const db = require('../firebase/database.js');
const { delUserState, getUserState, setUserState } = require('../firebase/state.js');

/*
	Webhook Functions: Query Intents 
*/

/* ========== ========== ========== ========== ========== ========== ========== */

const jsonData = fs.readFileSync('./fulfillment/agent-query-response-dialogue.json', 'utf8');
const responses = JSON.parse(jsonData);

/* ========== ========== ========== ========== ========== ========== ========== */

const enQueryDiseaseCause = async (agent) => {
	const disease = agent.parameters.disease;

	agent.add(responses.diseases[disease.toLowerCase()].response_cause);
};

const enQueryDiseaseDefinition = async (agent) => {
	const disease = agent.parameters.disease;

	agent.add(responses.diseases[disease.toLowerCase()].response_definition);
};

const enQueryDiseaseSymptom = async (agent) => {
	const disease = agent.parameters.disease;

	agent.add(responses.diseases[disease.toLowerCase()].response_symptoms);
};

const enQueryDiseaseTreatment= async (agent) => {
	const disease = agent.parameters.disease;

	agent.add(responses.diseases[disease.toLowerCase()].response_treatment);
};

const enQuerySymptomDefinition = async (agent) => {
	const symptom = agent.parameters.symptom;

	agent.add(responses.symptoms[symptom.toLowerCase()].response_definition);
};

module.exports = {
	enQueryDiseaseCause,
	enQueryDiseaseDefinition,
	enQueryDiseaseSymptom,
	enQueryDiseaseTreatment,
	enQuerySymptomDefinition,
};
