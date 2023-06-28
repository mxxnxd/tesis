/*
	Description: 	Script for managing intents using the intent manager.
	Author: 		Steven Castro
*/

const manager = require('./intent-manager.js');

const main = async () => {
	const str = 2; // Excel Row -2
	const end = 2; // Excel Row -1

	// Load Intent Data
	const intents = manager.loadIntentExcel('elicitation');

	// Delete Intents
	for (i = str - 2; i < end - 1; i++) {
		await manager.callDeleteIntent(intents[i]);
	}

	// Create Intents
	for (i = str - 2; i < end - 1; i++) {
		await manager.callCreateIntent(intents[i]);
	}
}

const test = async () => {
	console.log(await manager.callListIntent());
}

console.log("========== ========== ========== ========== ==========");
main();
// test();