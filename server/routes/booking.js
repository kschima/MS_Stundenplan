const express = require('express');
const router = express.Router();
const booking_calls = require('./../neo4j_calls/booking');

router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :8080/booking")
    return 700000;
})

router.post('/', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { name } = req.body;
    let string = await booking_calls.create_booking(name);
    res.status(200).send("Booking for " + string + " created")
    return 700000;
})

router.get('/create_booking', async function (req, res, next) {
    let name = 'Rudolf Lehmann';
    let string = await booking_calls.create_booking(name);
    res.status(200).send("Booking named " + string + " created")
    return 700000;
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