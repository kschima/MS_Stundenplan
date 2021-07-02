const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');

router.get('/', async function (req, res, next) {
    let { id } = req.body;
    let result = await room_calls.getRoom(id);
    console.log("RESULT IS", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})

router.put('/', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { id, name, description } = req.body;
    let string = await room_calls.updateRoom(id, name, description);
    res.status(200).send("Room named '" + string + "' updated")
    return 700000;
})

router.post('/', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { id, name, description } = req.body;
    let string = await room_calls.createRoom(id, name, description);
    res.status(200).send("Room named '" + string + "' created")
    return 700000;
})

router.delete('/', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { id } = req.body;
    let string = await room_calls.deleteRoom(id);
    res.status(200).send("Room named '" + string + "' deleted")
    return 700000;
})

module.exports = router;