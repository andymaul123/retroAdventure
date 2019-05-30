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
	write: function(storeItem, value, obj, path) {
		if(!obj || !path) {
			store[storeItem] = value;
		} else {
			if (path.length === 1) {
				obj[path] = value
				return
			}
			return module.exports.write(storeItem, value, obj[path[0]], path.slice(1))
		}
	  }

}