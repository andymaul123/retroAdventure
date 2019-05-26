const store = require('./store.js'),
      constants = require('./constants.js');

function look(input) {
  if(input.length === 1) {
    console.log(fetchRoom(store.read(constants.currentRoomId)).desc);
  } else {
    if(input[1] === "at") {
      // print desc of input[2]
    } else {
      console.log("Look at what, now?");
    }
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
    input = input.split(' ');
    switch(input[0]) {
      case "look":
        look(input);
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