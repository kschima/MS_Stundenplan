const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');

router.get('/:id', async function (req, res, next) {
    let result = await room_calls.getRoom(req.params.id);
    console.log("RESULT IS", result);
    res.status(200).send(result);   
    return { result };
})

router.put('/', async function (req, res, next) {
    let { id, name, description } = req.body;
    let result = await room_calls.updateRoom(id, name, description);
    res.status(200).send("Room named '" + result + "' updated");
    return 700000;
})

router.post('/', async function (req, res, next) {
    let { id, name, description } = req.body;
    let result = await room_calls.createRoom(id, name, description);
    res.status(200).send("Room named '" + result + "' created");
    return 700000;
})

router.delete('/:id', async function (req, res, next) {
    let result = await room_calls.deleteRoom(req.params.id);
    res.status(200).send("Room named '" + result + "' deleted");
    return 700000;
})

module.exports = router;