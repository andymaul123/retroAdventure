constants = require('./constants.js');

let store = {};
store[constants.gamesDirectory] = "./games";
store[constants.inventory] = {
	items: []
}
store[constants.gameFile] = null;
store[constants.rim] = {};

store[constants.time] = -1;



module.exports = {

	read: function(globalPropertyName) {
		return store[globalPropertyName]
	},
	write: function(storeItem, value, obj, path) {
		// console.log(storeItem);
		// console.log(value);
		// console.log(obj);
		// console.log(path);
		if(!obj || !path) {
			// console.log("failing here");
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