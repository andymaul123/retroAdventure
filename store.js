constants = require('./constants.js');

let store = {};
store[constants.gamesDirectory] = "./games";
store[constants.inventory] = [];
store[constants.gameFile] = null;
store[constants.rim] = {};



module.exports = {

	read: function(globalPropertyName) {
		return store[globalPropertyName]
	},
	write: function(globalPropertyName,newValue) {
		store[globalPropertyName] = newValue;
	}

}