// Import Libraries
const {SessionsClient, IntentsClient} = require('@google-cloud/dialogflow').v2
const express = require('express')
require('dotenv').config()


const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
const PROJECTID = CREDENTIALS.project_id

const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS['private_key'],
		client_email: CREDENTIALS['client_email']	
	}
}

const sessionClient = new SessionsClient(CONFIGURATION);
const intentClient = new IntentsClient(CONFIGURATION);

const callCreateIntent = async (intent) => {
	let agentPath = intentClient.projectAgentPath(PROJECTID);

	let req = {
		parent: agentPath,
		intent: intent
	}

	let res = await intentClient.createIntent(req)
	console.log(res)
}
	
const callDetectIntent = async (languageCode, queryText, sessionId) => {
	let sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId)

	console.log(sessionPath)

	let req = {
		session: sessionPath,
		queryInput: {
			text: {
				text: 'Hello',
				languageCode: 'en', 
			},
		},
	};

	let res = await sessionClient.detectIntent(req)
	console.log(res)
}

const buildIntent = (name, phrases, responses) => {
	let trainingPhrases = []
	let messages = []

	phrases.forEach(phrase => {
	 	const part = {text: phrase}	
	 	const trainingPhrase = {
	 		type: 'EXAMPLE',
	 		parts: [part]	
	 	}
	 	trainingPhrases.push(trainingPhrase)
	});

/*	responses.forEach(response => {
		const message = {text: response}
		messages.push({text: message})
	});*/

	const messageText = {
    	text: ["messageTexts"],
  	};

  	const message = {
    	text: messageText,
  	};	

	let intent = {
		displayName: name,
		trainingPhrases: trainingPhrases,
		messages: [message]
	}

	return intent
}

// Express
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/df', async (req, res) => {
	let languageCode = req.body.languageCode;
	let queryText = req.body.queryText;
	let sessionId = req.body.sessionId;

	let responseData = await callDetectIntent(languageCode, queryText, sessionId)
	res.send(responseData.response)	
})

// app.listen(3000, () => {
// 	console.log('Agent K is running at port 3000...')
// })

let new_intent = buildIntent('sample.test.create2', ['spaghetti', 'carbonara', 'pesto'], ['Italiano dishes', "Wakanda"])

console.log(new_intent)


callCreateIntent(new_intent)
//callDetectIntent('en', 'Hello', '12341234')


