const   store = require('../store.js'),
        constants = require('../constants.js'),
        controller = require('../controller.js'),
        helpers = require('../helpers.js');
module.exports = {
  title: "tower",
  img: `
  _____                       
  /__   \\_____      _____ _ __ 
    / /\\/ _ \\ \\ /\\ / / _ \\ '__|
   / / | (_) \\ V  V /  __/ |   
   \\/   \\___/ \\_/\\_/ \\___|_|   
      `,
  desc: "What secrets sleep within?",
  rooms: [
    {
      id: 1,
      name: "Starting Area",
      isDark: false,
      describe: function(local) {
        if(local) {
          return "There isn't much else, let alone a room."
        } else {
          return "You stand in water up to your knees; endless, black, and nearly placid. It isn't cold or warm, but smells of brine. A severe structure, jutting toward the moon above, is to the north. It is a tower."
        }
      },
      onRender: function() {
        return null;
      },
      exits: [
        {
          name: "entrance",
          direction: "north",
          toRoomId: 2,
          locked: false,
          describe: function(local) {
            if(local) {
              return "Not a door, but in fact a window? Either way, it is large enough for you to crawl into."
            } else {
              return "A single entrance, illuminated by a beam of moonlight, beckons."
            }
          }
        }
      ],
      items: [
        {
          name: "Tower",
          describe: function(local) {
            if(local) {
              return "A lonely spire in the middle of this sea. It seems to be made from old, weathered stone. Its only feature seems to be an entrance about six feet up from sea-level."
            } else {
              return null
            }
          },
          canTake: false,
          canUse: false,
          activate: function() {
            return null;
          },
          aliases: ["SPIRE"]
        },
        {
          name: "water",
          describe: function(local) {
            if(local) {
              return "As far as you can tell it's just normal sea-water. Further out the shallows turn to depths. What secrets lie beneath?"
            } else {
              return null
            }
          },
          canTake: false,
          canUse: false,
          activate: function() {
            return null;
          },
          aliases: ["SEA"]
        }
      ]
    },
    {
      id: 2,
      name: "Starting Room",
      isDark: false,
      describe: function(local) {
        if(local) {
          return "It's a room...longer description."
        } else {
          return "It's a room!"
        }
      },
      onRender: function() {
        return null;
      },
      exits: [
        {
          name: "portcullis",
          direction: "north",
          toRoomId: 3,
          locked: true,
          describe: function(local) {
            if(local) {
              return "An iron portcullis bars the way."
            } else {
              return "A passage to the north is locked behind the cold iron bars of a portcullis."
            }
          }
        }
      ],
      items: [
        {
          name: "Sword",
          describe: function(local) {
            if(local) {
              return "A trusty weapon."
            } else {
              return "In the corner is a sword."
            }
          },
          canTake: true,
          use: null
        },
        {
          name: "Lever",
          describe: function(local) {
            if(local) {
              return "A big, metal lever."
            } else {
              return "On the west wall is a big, metal lever with mechanical gears at its base."
            }
          },
          canTake: false,
          canUse: true,
          activate: function() {
            if(this.canUse) {
              console.log("With a mighty heave you slam the lever downward. Sounds of mechanical gears rumble, and the portcullis bars slowly retract.");
              this.canUse = false;
              helpers.fetchExits("north").exit.locked = false;
            } else {
              console.log("The lever is stuck in its downward position.");
            }
          }
        },
        {
          name: "Torch",
          describe: function(local) {
            if(local) {
              return this.isOn ? "A smoldering torch to light the way." : "Oil-soaked and ready to be lit.";
            } else {
              return "Twin brackets adorn the walls. One empty, save for cobwebs; the other sports an unlit torch."
            }
          },
          canTake: true,
          canUse: true,
          isOn: false,
          activate: function() {
            if(this.isOn) {
              console.log("The torch is already lit!");
            } else {
              console.log("With a strike of steel and flint the torch catches. It is now lit.");
              this.isOn = true;
            }
          }
        }
      ]
    },
    {
      id: 3,
      name: "End Room",
      isDark: true,
      describe: function(local) {
        if(local) {
          return "The end of the game."
        } else {
          return "The end room long description goes here."
        }
      },
      onRender: function() {
        return null;
      },
      exits: [
        {
          name: "portcullis",
          direction: "south",
          toRoomId: 1,
          locked: false,
          describe: function(local) {
            if(local) {
              return "The portcullis back south is open."
            } else {
              return "To the south is the opened portcullis."
            }
          }
        }
      ],
      items: [
        {
          name: "Contraption",
          describe: function(local) {
            if(local) {
              return "It is some kind of timepiece, perhaps?"
            } else {
              return "A clockwork contraption rests on a stone pedestal."
            }
          },
          canTake: false,
          canUse: true,
          activate: function() {
            console.log("It indicates a single number: " + store.read(constants.time));
          }
        }
      ]
    }
  ]
};