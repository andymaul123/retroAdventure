const fs = require('fs'),
      store = require('./store.js'),
      constants = require('./constants.js'),
      helpers = require('./helpers.js');

/*
===================================================================================================
LOOK
===================================================================================================
*/
function look(input) {
  if(helpers.canSeeRoom()) {
    if(input.length === 1) {
      console.log(store.read(constants.rim).describe());
    } else {
      if(input[1].toUpperCase() === "AT" && input[2]) {
        if(helpers.fetchItem(input[2]).item) {
          console.log(helpers.fetchItem(input[2]).item.describe(true));
        } else if (input[2].toUpperCase() === "ROOM") {
          console.log(store.read(constants.rim).describe(true))
        } else if (helpers.fetchExits(input[2], true).exit) {
          //console.log(helpers.fetchExits(input[2], true).exit);
          console.log(helpers.fetchExits(input[2], true).exit.describe(true));
        } else {
          console.log("Look at what, now?");
        }
      } else if (constants.cardinalDirections.includes(input[1].toUpperCase())) {
        if(helpers.fetchExits(input[1]).exit) {
          console.log(helpers.fetchExits(input[1]).exit.describe(true));
        } else {
          console.log("There's nothing that way...");
        }
      } else {
        console.log("Look at what, now?");
      }
    }
  } else {
    console.log(constants.pitchBlack);
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
      if(helpers.fetchExits(input[1]).exit) {
        if(helpers.fetchExits(input[1]).exit.locked){
          console.log("The way "+input[1]+" is locked.");
        } else {
          store.write(constants.rim,helpers.fetchRoom(helpers.fetchExits(input[1]).exit.toRoomId));
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
  for (var i = 0; i < store.read(constants.inventory).items.length; i++) {
    inventory.push("- " + store.read(constants.inventory).items[i].name);
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
  if(itemTaken.item && itemTaken.location === constants.rim) {
    if(itemTaken.item.canTake) {
      helpers.addItemToInventory(itemTaken.item);
      helpers.removeItemFromRoom(itemTaken.item);
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
  let itemBeingUsed =  helpers.fetchItem(input[1]);
  if(itemBeingUsed) {
    itemBeingUsed.item.activate && itemBeingUsed.canUse ? itemBeingUsed.item.activate() : console.log("You can't use that.");
  } else {  
    console.log("Use what?");
  }
}

/*
===================================================================================================
SAVE
===================================================================================================
*/

function save() {
  const data = store.save();
  fs.writeFile('./saves/'+data[constants.gameFile].title+'.js', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

/*
===================================================================================================
ROOM - Debug command
===================================================================================================
*/
function room() {
  console.log(store.read(constants.rim));
}
/*
===================================================================================================
EXPORTS
===================================================================================================
*/
module.exports = {

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
      case "ROOM":
        room();
        break;
      case "SAVE":
        save();
        break;
      default:
        console.log("I don't know that command. Try HELP?");
        break;
    }
  }

}