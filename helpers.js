const store = require('./store.js'),
      constants = require('./constants.js'),
      util = require('util');

module.exports = {

    fetchRoom: function(roomId) {
        return store.read(constants.gameFile).rooms.find(function(obj){
            return obj.id === roomId;
        })
    },
    fetchItem: function(itemName) {
        let fetchedItem = {};
        fetchedItem.item = store.read(constants.rim).items.find(function(obj){
            return obj.name.toUpperCase() === itemName.toUpperCase();
        });
        if(fetchedItem.item) {
            fetchedItem.location = constants.rim;
            fetchedItem.index = store.read(constants.rim).items.findIndex(function(obj){
                return obj.name.toUpperCase() === itemName.toUpperCase();
            });
        } else {
            fetchedItem.item = store.read(constants.inventory).items.find(function(obj){
                return obj.name.toUpperCase() === itemName.toUpperCase();
            }); 
            fetchedItem.location = constants.inventory;
            fetchedItem.index = store.read(constants.rim).items.findIndex(function(obj){
                return obj.name.toUpperCase() === itemName.toUpperCase();
            });
        }
        return fetchedItem;
    },
    fetchExits: function(identifier, isAlias) {
        let fetchedExit = {}, keyName;
        isAlias ? keyName = "name" : keyName = "direction";
        fetchedExit.exit = store.read(constants.rim).exits.find(function(obj){
            return obj[keyName].toUpperCase() === identifier.toUpperCase();
        });
        fetchedExit.index = store.read(constants.rim).exits.findIndex(function(obj){
            return obj[keyName].toUpperCase() === identifier.toUpperCase();
        });
        return fetchedExit;
    },
    addItemToInventory: function(item) {
        store.write(constants.inventory, store.read(constants.inventory).items.concat(item), store.read(constants.inventory), ["items"]);
    },
    removeItemFromRoom: function(item) {
        store.write(constants.rim, store.read(constants.rim).items.filter(obj => obj.name.toUpperCase() != item.name.toUpperCase()), store.read(constants.rim), ["items"]);
    },
    canSeeRoom: function() {
        if(store.read(constants.rim).isDark) {
            return this.fetchItem("torch").item ? this.fetchItem("torch").item.isOn : false;
        }
        return true;
    },
    renderRoom: function(gameStart) {
        if(this.canSeeRoom()) {
            let roomDescription = "";
            if(gameStart) {
              store.write(constants.rim, this.fetchRoom(1), store.read(constants.rim));
            }
            roomDescription = store.read(constants.rim).describe();
            for (var i = 0; i < store.read(constants.rim).items.length; i++) {
              roomDescription = roomDescription + " " + store.read(constants.rim).items[i].describe();
            }
            for (var i = 0; i < store.read(constants.rim).exits.length; i++) {
              roomDescription = roomDescription + " " + store.read(constants.rim).exits[i].describe();
            }
            console.log(roomDescription);
            this.advanceTime();
            store.read(constants.rim).onRender();
        } else {
            console.log(constants.pitchBlack);
        }
    },
    changePropertyState: function(context) {
        store.write(context.location, context.value, context.obj, context.path);
    },
    createContext: function(location, value, obj, path) {
        return {location: location, value: value, obj: obj, path: path}
    },
    advanceTime: function(timeAdvance) {
        if(timeAdvance) {
            store.write(constants.time, store.read(constants.time) + timeAdvance);
        } else {
            store.write(constants.time, store.read(constants.time)+1);
        }
    }
}