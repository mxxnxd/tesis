/*
	Description: 	Functions for managing user dialogue states
	Author: 		Steven Castro
	Remarks: 		Users are identified via Sender ID
*/

const stateMap = new Map();

const getState = (id) => {
	return stateMap.get(id);
};

const setState = (id, state) => {
	stateMap.set(id, state);
};

const deleteState = (id) => {
	stateMap.delete(id);
};

module.exports = {
	getState,
	setState, 
	deleteState
};

/* ===== ===== ===== ===== ===== ===== ===== */



