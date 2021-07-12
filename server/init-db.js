const booking_calls = require('./neo4j_calls/booking');
const room_calls = require('./neo4j_calls/room');
const utils_calls = require('./neo4j_calls/utils');

var roomsJson = require('./config/init/rooms.json');
var slotsJson = require('./config/init/slots.json');
var daysJson = require('./config/init/days.json');

exports.init = async function () {
    await utils_calls.deleteNodesAndRelationships();

    daysJson.forEach(async day => {
         await room_calls.createDay(day);
         
         roomsJson.forEach(async room => {
            await room_calls.createRoomDate(day, room.name, room.description);
            
            slotsJson.forEach(slot => {
                room_calls.createSlotRoom(day, room.name, slot.id, slot.from, slot.until, slot.booked);
            });
        });
        
    });

}
