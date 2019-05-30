const store = require('./store.js'),
      constants = require('./constants.js'),
      helpers = require('./helpers.js');

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
      if(helpers.fetchItem(input[2])){
        console.log(helpers.fetchItem(input[2]).desc);
      } else if(helpers.fetchItem(input[2],true)) {
        console.log(helpers.fetchItem(input[2],true).desc);
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
      if(helpers.fetchExits(input[1])) {
        if(helpers.fetchExits(input[1]).locked){
          console.log("The way "+input[1]+" is locked.");
        } else {
          store.write(constants.rim,helpers.fetchRoom(helpers.fetchExits(input[1]).toRoomId));
          helpers.renderRoom();
        }
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
  let inventory = [];
  for (var i = 0; i < store.read(constants.inventory).length; i++) {
    inventory.push("- " + store.read(constants.inventory)[i].name);
  }
  console.log("You have: \n" + inventory.join(", "));
}

/*
===================================================================================================
TAKE
===================================================================================================
*/
function take(input) {
  let itemTaken = helpers.fetchItem(input[1]);
  if(itemTaken) {
    if(itemTaken.canTake) {
      helpers.addItemToInventory(itemTaken);
      helpers.removeItemFromRoom(itemTaken);
      console.log("You take the " + input[1]);
    } else {
      console.log("You can't take that.");
    }
  } else {
    console.log("Take what?");
  } 
}

/*
===================================================================================================
USE
===================================================================================================
*/

function use(input) {
  let cmdObj = helpers.fetchItem(input[1]) ? helpers.fetchItem(input[1]) : helpers.fetchItem(input[1], true);
  if(cmdObj) {
    helpers[cmdObj.use.functionName](cmdObj.use);
    console.log(cmdObj.use.message);
  } else {  
    console.log("Use what?");
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
  }
}