const store = require('./store.js'),
      constants = require('./constants.js');
let tempString = "",
    tempObj = {},
    tempArray = [];

/*
===================================================================================================
LOOK
===================================================================================================
*/
function look(input) {
  if(input.length === 1) {
    console.log(store.read(constants.rim).desc);
  } else {
    if(input[1].toUpperCase() === "AT" && input[2]) {
      if(fetchItem(input[2])){
        console.log(fetchItem(input[2]).desc);
      } else if(fetchItem(input[2],true)) {
        console.log(fetchItem(input[2],true).desc);
      }
      else {
        console.log("Look at what, now?");
      }
    } else {
      console.log("Look at what, now?");
    }
  }
}

/*
===================================================================================================
MOVE
===================================================================================================
*/
function move(input) {
  if(input[1]) {
    if(constants.cardinalDirections.includes(input[1].toUpperCase())) {
      if(fetchExits(input[1])) {
        store.write(constants.rim,fetchRoom(fetchExits(input[1]).toRoomId))
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

function fetchExits(direction) {
 return store.read(constants.rim).exits.find(function(obj){
    return obj.direction.toUpperCase() === direction.toUpperCase();
  });
}

/*
===================================================================================================
HELP
===================================================================================================
*/
function help() {
  console.log(constants.helpMessage);
}

/*
===================================================================================================
INVENTORY
===================================================================================================
*/
function inventory() {
  tempArray = [];
  for (var i = 0; i < store.read(constants.inventory).length; i++) {
    tempArray.push("- " + store.read(constants.inventory)[i].name);
  }
  console.log("You have: \n" + tempArray.join(", "));
}

/*
===================================================================================================
TAKE
===================================================================================================
*/
function take(input) {
  tempObj = fetchItem(input[1]);
  if(tempObj) {
    if(tempObj.canTake) {
      addItemToInventory(tempObj);
      removeItemFromRoom(tempObj);
      console.log("You take the " + input[1]);
    } else {
      console.log("You can't take that.");
    }
  } else {
    console.log("Take what?");
  } 
}

function addItemToInventory(item) {
  tempArray = store.read(constants.inventory);
  tempArray.push(item);
  store.write(constants.inventory,tempArray);
}

function removeItemFromRoom(item) {
  tempObj = store.read(constants.rim);
  tempObj.items = tempObj.items.filter(obj => obj.id != item.id);
  store.write(constants.rim, tempObj);
}

/*
===================================================================================================
USE
===================================================================================================
*/

function use(input) {
  if(fetchItem(input[1])) {
    fetchItem(input[1]).use();
  } else if (fetchItem(input[1],true)) {
    fetchItem(input[1]).use();
  }
}

/*
===================================================================================================
MISC
===================================================================================================
*/
function fetchRoom(roomId) {
  return store.read(constants.gameFile).rooms.find(function(obj){
    return obj.id === roomId;
  })
}
// Helper to expose item data by name
function fetchItem(itemName, checkInventory) {
  if(checkInventory) {
    return store.read(constants.inventory).find(function(obj){
      return obj.name.toUpperCase() === itemName.toUpperCase();
    }) 
  } else {
    return store.read(constants.rim).items.find(function(obj){
      return obj.name.toUpperCase() === itemName.toUpperCase();
    })  
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
        use(input);
        break;
      case "MOVE":
        move(input);
        break;
      case "TAKE":
        take(input);
        break;
      case "HELP":
        help();
        break;
      case "INVENTORY":
        inventory();
        break;
      default:
        console.log("I don't know that command. Try HELP?");
        break;
    }
  },
  // Aggregates room and item's room descriptions into a single display. Used for first entry into a room.
  renderRoom: function(gameStart) {
    if(gameStart) {
      store.write(constants.rim, fetchRoom(1));
    }
    tempString = store.read(constants.rim).desc;
    for (var i = 0; i < store.read(constants.rim).items.length; i++) {
      tempString = tempString + " " + store.read(constants.rim).items[i].roomDesc;
    }
    if(store.read(constants.rim).exits.length) {
      tempString = tempString + " There are exits to the: \n";
      tempArray = [];
      for (var i = 0; i < store.read(constants.rim).exits.length; i++) {
        tempArray.push("- " + store.read(constants.rim).exits[i].direction);
      }
      tempString = tempString + tempArray.join("\n");
    }
    console.log(tempString);
  }
}