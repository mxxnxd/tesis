/*
	Description: 	Script for managing intents using the intent manager.
	Author: 		Steven Castro
*/

const manager = require('./intent-manager.js');

const main = async () => {
	const str = 7; // Excel Row -2
	const end = 10; // Excel Row -1

	// Load Intent Data
	const intents = manager.loadIntentExcel();

	// Delete Intents
	for (i = str; i < end; i++) {
		await manager.callDeleteIntent(intents[i]);
	}

	// Create Intents
	for (i = str; i < end; i++) {
		await manager.callCreateIntent(intents[i]);
	}
}

const test = async () => {
	console.log(await manager.callListIntent());
}

console.log("========== ========== ========== ========== ==========");
main();
// test();