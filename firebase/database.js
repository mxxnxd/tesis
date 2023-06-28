// Packages
const admin = require("firebase-admin");
require('dotenv').config({path: '../.env'});
require('dotenv').config();

const FIREBASE = JSON.parse(process.env.FIREBASE);

const app = admin.initializeApp({
	credential: admin.credential.cert(FIREBASE),
	databaseURL: "https://symptom-checker-chatbot-fd705-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Databases
var db = app.database();

const getUser = (id) => {
	var ref = db.ref(`users/${id}`);

	return new Promise((resolve, reject) => {
		ref.once('value', (snapshot) => {
			resolve(snapshot.val());
		});
	});
};

const createUser = (id, json) => {
	var ref = db.ref(`users/${id}`);
	ref.set(json);
};

const deleteUser = (id) => {
	var ref = db.ref(`users/${id}`);
	ref.remove();
};

const updateUser = (id, json) => {
	var ref = db.ref(`users/${id}/user`);
	ref.update(json);
};

const updateAgent = (id, json) => {
	var ref = db.ref(`users/${id}/agent`);
	ref.update(json);
};

const updateUserSeverity = (id, json) => {
	var ref = db.ref(`users/${id}/user/severity`);
	ref.update(json);
};

const createSession = (id, timestamp, json) => {
	var ref = db.ref(`sessions/${id}/${timestamp}`);
	ref.set(json);
};

const getSession = (id, timestamp) => {
	var ref = db.ref(`sessions/${id}/${timestamp}`);

	return new Promise((resolve, reject) => {
		ref.once('value', (snapshot) => {
			resolve(snapshot.val());
		});
	});
};

const createAgent = (id, json) => {
	var ref = db.ref(`agent/${id}`);
	ref.set(json);
};

const getAgent = (id) => {
	var ref = db.ref(`agent/${id}`);

	return new Promise((resolve, reject) => {
		ref.once('value', (snapshot) => {
			resolve(snapshot.val());
		});
	});
};

const deleteAgent = (id) => {
	var ref = db.ref(`agent/${id}`);
	ref.remove();
};

const closeDB = () => {
	db.goOffline();
	app.delete();
};

const main = async () => {

	// const id = 'TEST';
	// var ref = db.ref(`agent/${id}`);
	// var setObj = new Set([1, "PHLEGM", "BALLS"]);
	// console.log(Array.from(setObj))
	// ref.set(Array.from(setObj));

	// const data = await getAgent('TEST');
	// console.log(new Set(data));



	// console.log('!');
	// console.log(await getUser(6636659469693773));
	// console.log(await getSession(6636659469693773, 1687431118));
};

module.exports = {
	getUser,
	deleteUser,
	updateUser,
	updateAgent,
	updateUserSeverity,
	createSession,
	getSession,
	createUser,
	closeDB,

	createAgent,
	getAgent,
	deleteAgent,
};

 main();



