const express = require('express');
const router = express.Router();
const booking_calls = require('../neo4j_calls/booking');

router.get('/', async function (req, res, next) {
    let { id } = req.body;
    let result = await booking_calls.getBooking(id);
    console.log("RESULT IS", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})

router.post('/', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { id, roomId, userId, date, from, until, courseBooking } = req.body;
    let result = await booking_calls.createBooking(id, roomId, userId, date, from, until, courseBooking);
    res.status(200).send({result})
    return 700000;
})

router.put('/', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { id, userId, date, from, until, courseBooking } = req.body;
    let string = await booking_calls.updateBooking(id, userId, date, from, until, courseBooking);
    res.status(200).send("Booking named '" + string + "' updated")
    return 700000;
})

router.delete('/', async function (req, res, next) {
    let { id } = req.body;
    let result = await booking_calls.deleteBooking(id);
    console.log("RESULT IS", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})


// router.post('/neo4j_post', async function (req, res, next) {
//     //Passing in "name" parameter in body of POST request
//     let { name } = req.body;
//     let string = await neo4j_calls.create_user(name);
//     res.status(200).send("User named " + string + " created")
//     return 700000;
//     //res.status(200).send("test delete")
// })

module.exports = router;