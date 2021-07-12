const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');
let roomsJson = require('../config/init/rooms.json');

router.get('/', async function (req, res, next) {
    //let result = await room_calls.getAllRooms();
    console.log("RESULT IS", roomsJson);
    res.status(200).send(roomsJson);    
    return { roomsJson };
})

module.exports = router;