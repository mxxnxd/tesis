const manager = require('./intent-manager');

const main = async () => {
	const start = 0
	const end = 19

	// Load Intent Data
	const intents = await manager.loadIntentCSV();

	// Delete Intents
	for (i = start; i < end; i++) {
		await manager.callDeleteIntent(intents[i].intent_name);
	}

	// Create Intents
	for (i = start; i < end; i++) {
		await manager.callCreateIntent(intents[i]);
	}
}

const test = async () => {
	console.log(await manager.callListIntent());
}

console.log("========== ========== ========== ========== ==========");
//test();
main();