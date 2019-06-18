const   store = require('../store.js'),
        constants = require('../constants.js'),
        controller = require('../controller.js'),
        helpers = require('../helpers.js');
module.exports = {
	title: "Adventure",
  rooms: [
    {
      id: 1,
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
          toRoomId: 2,
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
      id: 2,
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
  ],
  img: `
   xx    ~~~       ~~~
     xxxxx 1         1
        x1!!!!! 0 !!!!!!!
        x1    !  0000000000
    !!xx!11#  !xx000000000000
    ! x x11x000 00!00000!   !
    !xxx!110  0 x !  0  ! # !
    !   !1111 0 x !  0  !   !
    !   0 1 1 0#x#!   00!   !
    ! #0! #1# 0##x00011111# !
    ! 00! #11 0000!11111!000!
    ! # ! ### !###! 1111111100
"""""""""""""""""""""""00000100"""""
      `,
  desc: "An example game."
};