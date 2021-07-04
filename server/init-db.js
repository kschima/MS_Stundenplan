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
    {
        id: "8",
        name: "A03",
        description: "Kleiner Raum"
    },
]

const bookings = [
    {  
        id: "1",
        roomId: "2",
        userId: "2",
        date: "21.06.2021",
        from: "10:00",
        until: "12:00",
        courseBooking: true
    },
    {  
        id: "2",
        roomId: "2",
        userId: "2",
        date: "21.06.2021",
        from: "12:00",
        until: "14:00",
        courseBooking: true
    },
    {  
        id: "3",
        roomId: "3",
        userId: "",
        date: "22.06.2021",
        from: "12:00",
        until: "14:00",
        courseBooking: true
    },
    {  
        id: "4",
        roomId: "3",
        userId: "",
        date: "22.06.2021",
        from: "12:00",
        until: "14:00",
        courseBooking: true
    },
    {  
        id: "5",
        roomId: "3",
        userId: "",
        date: "22.06.2021",
        from: "12:00",
        until: "14:00",
        courseBooking: true
    },

]

exports.init = async function () {
    await utils_calls.deleteNodesAndRelationships();

    rooms.forEach(room => {
        room_calls.createRoom(room.id, room.name, room.description);
    });

    bookings.forEach(booking => {
        booking_calls.createBooking(booking.id, booking.roomId, booking.userId, booking.date, booking.from, booking.until, booking.courseBooking); 
    });

}
