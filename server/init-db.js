const booking_calls = require('./neo4j_calls/booking');
const room_calls = require('./neo4j_calls/room');
const utils_calls = require('./neo4j_calls/utils');

const rooms = [
    {
        id: "1",
        name: "A01",
        description: "Großer Raum mit Projektor"
    },
    {
        id: "2",
        name: "A02",
        description: "Großer Raum mit Projektor"
    },
    {
        id: "3",
        name: "A03",
        description: "Kleiner Raum mit Projektor"
    },
    {
        id: "4",
        name: "A04",
        description: "Kleiner Raum"
    },
    {
        id: "5",
        name: "A05",
        description: "Kleiner Raum"
    },
    {
        id: "6",
        name: "B01",
        description: "Kleiner Raum mit Projektor"
    },
    {
        id: "7",
        name: "B02",
        description: "Kleiner Raum"
    },
]

const slots = [
    {
      id: "0",
      from: "08:00",
      until: "10:00",
      booked: false,
      userId: ""
    },
    {
      id: "1",
      from: "10:00",
      until: "12:00",
      booked: false,
      userId: ""
    },
    {
      id: "2",
      from: "12:00",
      until: "14:00",
      booked: false,
      userId: ""
    },
    {
      id: "3",
      from: "14:00",
      until: "16:00",
      booked: false,
      userId: ""
    },
    {
        id: "4",
        from: "16:00",
        until: "18:00",
        booked: false,
        userId: ""
    },
  ]

const days = [
    "2021-07-12",
    "2021-07-13",
    "2021-07-14",
    "2021-07-15",
    "2021-07-16",
    "2021-07-17",
    "2021-07-18",
    "2021-07-19",
    "2021-07-20",
]


exports.init = async function () {
    await utils_calls.deleteNodesAndRelationships();

    days.forEach(async day => {
         await room_calls.createDay(day);
         
         rooms.forEach(async room => {
            await room_calls.createRoomDate(day, room.name, room.description);
            
            slots.forEach(slot => {
                room_calls.createSlotRoom(day, room.name, slot.id, slot.from, slot.until, slot.booked);
            });
        });
        
    });

}
