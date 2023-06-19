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

const closeDB = () => {
	db.goOffline();
	app.delete();
};

const main = async () => {

	// const diseases = ['copd', 'asthma', 'pneumonia', 'lung_cancer', 'tuberculosis', 'heart_failure', 'hypertension', 'cad', 'arrhythmia', 'cardiomyopathy', 'valve_disease', 'myocardial_infarction', 'aneurysm']
	// const symptoms = ['abdomen_pain', 'anxiety','appetite_loss', 'arm_pain', 'back_pain', 'belly_swell', 'blurry', 'bone_pain', 'chest_pain', 'chest_tight', 'chills', 'colds', 'confusion', 'cough', 'cyanosis', 'dizzy', 'dysphasia', 'dyspnea', 'faint', 'fatigue', 'fever', 'headaches', 'heartburn', 'hoarseness', 'legs_swell', 'mouth_pain', 'muscle_pain', 'nausea', 'neck_shoulder_pain', 'neck_swell', 'neck_tight', 'pale_sweat', 'phlegm_clear', 'phlegm_green', 'phlegm_red', 'phlegm_white', 'r_infections', 'sleep_hard', 'tachycardia', 'tachypnea', 'urine_blood', 'weakness', 'weightgain', 'weightloss', 'wheeze']

	// diseases.forEach(disease => {
	// 	var ref = db.ref(`diseases/${disease}/responses`);
	// 	ref.update({ans_impression: ''});
	// });

	var ref = db.ref(`symptoms`);
	

}

module.exports = {
	getUser,
	deleteUser,
	updateUser,
	updateAgent,
	createUser,
	closeDB,
};

main();



