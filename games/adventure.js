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
          toRoomId: 2
        }
      ],
      items: [
        {
          id: 1,
          name: "Sword",
          desc: "A trusty weapon.",
          roomDesc: "In the corner is a sword.",
          type: "Weapon"
        }
      ]
    },
    {
      id: 2,
      name: "End Room",
      desc: "The end of the game.",
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