const store = require('./store.js'),
      constants = require('./constants.js');
let lastMove, roomDesc;

// Displays either current room description or description of target 
function look(input) {
  if(input.length === 1) {
    console.log(fetchRoom(store.read(constants.currentRoomId)).desc);
  } else {
    if(input[1].toUpperCase() === "AT" && input[2]) {
      console.log(fetchItem(input[2]).desc);
    } else {
      console.log("Look at what, now?");
    }
  }
}
// Helper to expose room data by id
function fetchRoom(roomId) {
  return store.read(constants.gameFile).rooms.find(function(obj){
    return obj.id === roomId;
  })
}
// Helper to expose item data by name
function fetchItem(itemName) {
  return fetchRoom(store.read(constants.currentRoomId)).items.find(function(obj){
    return obj.name.toUpperCase() === itemName.toUpperCase();
  })
}

// Handles moving to and from rooms
function move(input) {
  if(input[1]) {
    if(constants.cardinalDirections.includes(input[1].toUpperCase())) {
      lastMove = fetchRoom(store.read(constants.currentRoomId)).exits.find(function(obj){
        return obj.direction.toUpperCase() === input[1].toUpperCase();
      });
      if(lastMove) {
        store.write(constants.currentRoomId,lastMove.toRoomId);
        module.exports.renderRoom();
      } else {
        console.log("You can't go that way.");
      }
    } else {
      console.log("Choose a cardinal direction to move.");
    }
  } else {
    console.log("Move where?");
  }
}


module.exports = {
  // Accepts user input and shunts it to a function above
  parseCommand: function(input) {
    input = input.split(' ');
    switch(input[0].toUpperCase()) {
      case "LOOK":
        look(input);
        break;
      case "USE":
        return "command success"
        break;
      case "MOVE":
        move(input);
        break;
      default:
        return "bad command"
        break;
    }
  },
  // Aggregates room and item's room descriptions into a single display. Used for first entry into a room.
  renderRoom: function() {
    roomDesc = fetchRoom(store.read(constants.currentRoomId)).desc;
    for (var i = 0; i < fetchRoom(store.read(constants.currentRoomId)).items.length; i++) {
      roomDesc = roomDesc + " " + fetchRoom(store.read(constants.currentRoomId)).items[i].roomDesc;
    }
    console.log(roomDesc);
  }
}