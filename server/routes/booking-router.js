const express = require('express');
const router = express.Router();
const booking_calls = require('../neo4j_calls/booking');

router.get('/', async function (req, res, next) {
    let { id } = req.body;
    let result = await booking_calls.getBooking(id);
    console.log("RESULT IS", result)
    res.status(200).send({ result })    
    return { result };
})

router.post('/', async function (req, res, next) {
    let { id, roomId, userId, date, from, until, courseBooking } = req.body;
    let result = await booking_calls.createBooking(id, roomId, userId, date, from, until, courseBooking);
    res.status(200).send({result})
    return 700000;
})

router.put('/', async function (req, res, next) {
    let { id, userId, date, from, until, courseBooking } = req.body;
    let string = await booking_calls.updateBooking(id, userId, date, from, until, courseBooking);
    res.status(200).send("Booking named '" + string + "' updated")
    return 700000;
})

router.delete('/', async function (req, res, next) {
    let { id } = req.body;
    let result = await booking_calls.deleteBooking(id);
    console.log("RESULT IS", result)
    res.status(200).send({ result })   
    return { result };
})

module.exports = router;