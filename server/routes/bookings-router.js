const express = require('express');
const router = express.Router();
const booking_calls = require('../neo4j_calls/booking');


router.get('/:userId', async function (req, res, next) {
    let result = await booking_calls.getBookingsByUserId(req.params.userId);
    console.log("RESULT IS", result)
    res.status(200).send(result)  
    return { result };
})

router.get('/', async function (req, res, next) {
    let result = await booking_calls.getAllBookings();
    console.log("RESULT IS", result)
    res.status(200).send(result)     
    return { result };
})

module.exports = router;