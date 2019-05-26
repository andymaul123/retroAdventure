const store = require('./store.js'),
      constants = require('./constants.js');

function look(target) {
  if(target) {

  } else {
    console.log(fetchRoom(store.read(constants.currentRoomId)).desc);
  }
}
function fetchRoom(roomId) {
  return store.read(constants.gameFile).rooms.find(function(obj){
    return obj.id === roomId;
  })
}


module.exports = {

  loadRoom: function() {
    console.log("Loading room...");
    look();
  },
  parseCommand: function(input) {
    switch(input) {
      case "look":
        look();
        break;
      case "use":
        return "command success"
        break;
      case "move":
        return "command success"
        break;
      default:
        return "bad command"
        break;
    }
  }

}