const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');

router.get('/', async function (req, res, next) {
    let result = await room_calls.getAllRooms();
    console.log("RESULT IS", result);
    res.status(200).send(result);    
    return { result };
})

module.exports = router;