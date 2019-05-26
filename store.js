constants = require('./constants.js');

let store = {};
store[constants.gamesDirectory] = "./games";
store[constants.currentRoomId] = 1;
store[constants.inventory] = [];
store[constants.gameFile] = null;



module.exports = {

	read: function(globalPropertyName) {
		return store[globalPropertyName]
	},
	write: function(globalPropertyName,newValue) {
		store[globalPropertyName] = newValue;
	}

}