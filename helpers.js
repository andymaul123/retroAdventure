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
            }) 
        } else {
            return store.read(constants.rim).items.find(function(obj){
            return obj.name.toUpperCase() === itemName.toUpperCase();
            })  
        }
    },
    fetchExits: function(direction) {
        return store.read(constants.rim).exits.find(function(obj){
            return obj.direction.toUpperCase() === direction.toUpperCase();
            });
    },
    addItemToInventory: function(item) {
        tempArray = store.read(constants.inventory);
        tempArray.push(item);
        store.write(constants.inventory,tempArray);
    },
    removeItemFromRoom: function(item) {
        tempObj = store.read(constants.rim);
        tempObj.items = tempObj.items.filter(obj => obj.id != item.id);
        store.write(constants.rim, tempObj);
    },
    renderRoom: function(gameStart) {
        let roomDescription = "";
        if(gameStart) {
          store.write(constants.rim, module.exports.fetchRoom(1));
        }
        roomDescription = store.read(constants.rim).desc;
        for (var i = 0; i < store.read(constants.rim).items.length; i++) {
          roomDescription = roomDescription + " " + store.read(constants.rim).items[i].roomDesc;
        }
        for (var i = 0; i < store.read(constants.rim).exits.length; i++) {
          roomDescription = roomDescription + " " + store.read(constants.rim).exits[i].roomDesc;
        }
        console.log(roomDescription);
      }
}