const manager = require('./intent-manager');

const main = async () => {
	// Load Intent Data
	const intents = await manager.loadIntentCSV();

	// Delete Intents
	for (const intent of intents) {
		await manager.callDeleteIntent(intent.intent_name);
	}

	// Create Intents
	for (const intent of intents) {
		await manager.callCreateIntent(intent);
	}
}

const test = async () => {
	console.log(await manager.callListIntent());
}

console.log("========== ========== ========== ========== ==========");
//test();
main();