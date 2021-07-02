const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');

router.get('/', async function (req, res, next) {
    let result = await room_calls.getRooms();
    console.log("RESULT IS", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})

module.exports = router;