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
	var ref = db.ref(`users/${id}`);
	ref.update(json);
};

const updateSymptom = (id, json) => {
	var ref = db.ref(`users/${id}/symptoms`);
	ref.update(json);
};

const getDisease = () => {
	var ref = db.ref(`diseases`);

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
	// ref.set(diseases);
	// var data = await getDisease('asthma');
	// console.log(data);
}

module.exports = {
	getUser,
	deleteUser,
	updateUser,
	createUser,
	updateSymptom,
	closeDB,
	getDisease
};

// main();




