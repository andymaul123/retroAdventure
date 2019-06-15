module.exports = {
	title: "Adventure",
  rooms: [
    {
      id: 1,
      name: "Starting Room",
      desc: "It's a room!",
      exits: [
        {
          direction: "north",
          toRoomId: 2,
          locked: true,
          desc: "An iron portcullis bars the way.",
          roomDesc: "A passage to the north is locked behind the cold iron bars of a portcullis."
        }
      ],
      items: [
        {
          id: 1,
          name: "Sword",
          desc: "A trusty weapon.",
          roomDesc: "In the corner is a sword.",
          canTake: true,
          use: null
        },
        {
          id: 2,
          name: "Lever",
          desc: "A big, metal lever.",
          roomDesc: "On the west wall is a big, metal lever with mechanical gears at its base.",
          canTake: false,
          use: {
            functionName: "changePropertyState",
            name: "north",
            target: "exit",
            path: "locked",
            value: "false",
            useOnce: true,
            canUse: true,
            message: "With a mighty heave you move the lever into its downward position!",
            canUseMessage: "The lever is stuck in its new position. It can't be moved again."
          }
        },
        {
          id: 3,
          name: "Torch",
          desc: "Oil-soaked and ready to be lit.",
          roomDesc: "Twin brackets adorn the walls. One empty, save for cobwebs; the other sports an unlit torch.",
          canTake: true,
          isOn: false,
          use: {
            functionName: "changePropertyState",
            name: "torch",
            target: "item", //wrong
            path: "isOn",
            value: "true",
            useOnce: false,
            canUse: true,
            message: "You light the torch.",
            canUseMessage: "It's already lit!"
          }
        }
      ]
    },
    {
      id: 2,
      name: "End Room",
      desc: "The end of the game.",
      roomDesc: "The end room long description goes here.",
      exits: [
        {
          direction: "south",
          toRoomId: 1
        }
      ],
      items: []
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