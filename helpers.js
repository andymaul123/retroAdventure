const store = require('./store.js'),
      constants = require('./constants.js');

module.exports = {

    fetchRoom: function(roomId) {
        return store.read(constants.gameFile).rooms.find(function(obj){
            return obj.id === roomId;
        })
    },
    fetchItem: function(itemName, checkInventory) {
        if(checkInventory) {
            return store.read(constants.inventory).find(function(obj){
                return obj.name.toUpperCase() === itemName.toUpperCase();
            }); 
        } else {
            return store.read(constants.rim).items.find(function(obj){
                return obj.name.toUpperCase() === itemName.toUpperCase();
            });  
        }
    },
    fetchExits: function(direction, returnIndex) {
        if(returnIndex) {
            return store.read(constants.rim).exits.findIndex(function(obj){
                return obj.direction.toUpperCase() === direction.toUpperCase();
            });
        } else {
            return store.read(constants.rim).exits.find(function(obj){
                return obj.direction.toUpperCase() === direction.toUpperCase();
            });
        }
    },
    addItemToInventory: function(item) {
        store.write(constants.inventory,store.read(constants.inventory).concat(item));
    },
    removeItemFromRoom: function(item) {
        store.write(constants.rim, store.read(constants.rim).items.filter(obj => obj.id != item.id), store.read(constants.rim),["items"]);
    },
    renderRoom: function(gameStart) {
        let roomDescription = "";
        if(gameStart) {
          store.write(constants.rim, module.exports.fetchRoom(1), store.read(constants.rim));
        }
        roomDescription = store.read(constants.rim).desc;
        for (var i = 0; i < store.read(constants.rim).items.length; i++) {
          roomDescription = roomDescription + " " + store.read(constants.rim).items[i].roomDesc;
        }
        for (var i = 0; i < store.read(constants.rim).exits.length; i++) {
          roomDescription = roomDescription + " " + store.read(constants.rim).exits[i].roomDesc;
        }
        console.log(roomDescription);
    },
    changeDoorState: function(context) {
        store.write(constants.rim, context.doorState, store.read(constants.rim),["exits",module.exports.fetchExits(context.doorDirection,true), "locked"]);
    }
}