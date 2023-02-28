const manager = require('./intent-manager');
const loader = require('./intent-loader');

const main = async () => {
	// Load Intent Data
	const intents = await loader.loadIntentCSV();

	// Delete Intents
	for (const intent of intents) {
		await manager.callDeleteIntent(intent.intent_name);
	}

	// Crete Intents
	for (const intent of intents) {
		await manager.callCreateIntent(intent);
	}
}

const test = async () => {
	
}

console.log("========== ========== ========== ========== ==========");
main();