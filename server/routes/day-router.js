const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');

router.get('/:day', async function (req, res, next) {
    let result = await room_calls.getDay(req.params.day);
    console.log("RESULT IS", result);
    res.status(200).send(result); 
    return result;
})

router.put('/book/:id', async function (req, res, next) {
    let userId = req.body.userId;
    //console.log("userID router: " + userId);
    let result = await room_calls.book(req.params.id, userId);
    console.log("RESULT IS (book)", result);
    res.status(200).send(result); 
    return result;
})

router.get('/mybooks/:userId', async function (req, res, next) {
    let result = await room_calls.myBookings(req.params.userId);
    console.log("RESULT IS (book)", result);
    res.status(200).send(result); 
    return result;
})

router.get('/cancel/:id', async function (req, res, next) {
    let result = await room_calls.cancelSlot(req.params.id);
    console.log("RESULT IS", result);
    res.status(200).send(result); 
    return result;
})

module.exports = router;