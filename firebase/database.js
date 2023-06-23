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

const closeDB = () => {
	db.goOffline();
	app.delete();
};

const main = async () => {

	

	console.log('!');
	console.log(await getUser(6636659469693773));
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
};

 main();



