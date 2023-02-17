const express = require('express')
const app = express()
const dfff = require('dialogflow-fulfillment')

// Questions (Dict)
var question_bank = {
	'Fever': 'Have you been experiencing fevers?',
	'Dizzy': 'Have you been feeling dizzy?',
	'CoughBlood': 'Have you been coughing blood?',
	'LightHeaded': 'Whenver you standup quickly, do you get lightheaded?',
	'Headache': 'Do you have headaches?'
}

var question_reply = {}

// Keys
var keys = Object.keys(question_bank)

// Current Symptom Being Asked
var check_symptom

app.get('/', (req, res) => {
	res.send('The Webserver is Live!')
	console.log('The Webserver is Live!')
});

// Define Intent Functions
function webhookStart(agent) {
	// Set Context
	agent.context.set({
		'name': 'symptom-check',
		'lifespan': 3
	})

	// Random Questions
	check_symptom = keys.pop()
	agent.add(question_bank[check_symptom])
}

function webhookEnd(agent) {
	// Set Context
	agent.context.set({
		'name': 'symptom-analysis',
		'lifespan': 3
	})

	agent.context.set({
		'name': 'symptom-check',
		'lifespan': 0
	})

	agent.add("I see you have these symptoms.")

	// Get Keys
	keys = Object.keys(question_bank)

	// Print Symptoms Obtained
	keys.forEach((key) => {
		console.log(key + ":" + question_reply[key])
	})
}

function webhookReplyYes(agent) {
	// Add to Replies
	question_reply[check_symptom] = 1

	if (0 < keys.length) {
		// Set Context
		agent.context.set({
			'name': 'symptom-check',
			'lifespan': 3
		})

		// Ask Random Questions
		check_symptom = keys.pop()
		agent.add(question_bank[check_symptom])
	} else {
		webhookEnd(agent)
	}
}

function webhookReplyNo(agent) {	
	// Add to Replies
	question_reply[check_symptom] = 0

	if (0 < keys.length) {
		// Set Context
		agent.context.set({
			'name': 'symptom-check',
			'lifespan': 3
		})

		// Ask Random Questions
		check_symptom = keys.pop()
		agent.add(question_bank[check_symptom])
	} else {
		webhookEnd(agent)
	}
}

app.post('/user', express.json(), (req, res) => {

	// Instantiate Agent
	const agent = new dfff.WebhookClient({
		request : req,
		response: res
	})

	// Map Intents
	var intentMap = new Map()
	intentMap.set('webhook', webhookStart)
	intentMap.set('webhook.reply.yes', webhookReplyYes)
	intentMap.set('webhook.reply.no', webhookReplyNo)
	agent.handleRequest(intentMap)
});

app.listen(3000, () => {
	console.log("Started!");
});


