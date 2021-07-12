const express = require('express');
const router = express.Router();
const room_calls = require('../neo4j_calls/room');

let dayBooking = [
    {
      room: "A01",
      description:"Kleiner Raum mit Projektor",
      slots: [
        {
          id: 0,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 1,
          from: "10:00",
          until: "12:00",
          booked: true
        },
        {
          id: 2,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 3,
          from: "12:00",
          until: "14:00",
          booked: false
        },
      ]
    },
    {
      room: "A02",
      slots: [
        {
          id: 0,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 1,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 2,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 3,
          from: "12:00",
          until: "14:00",
          booked: true
        },
      ]
    },
    {
      room: "A03",
      slots: [
        {
          id: 0,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 1,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 2,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 3,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 5,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 6,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 7,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 8,
          from: "12:00",
          until: "14:00",
          booked: false
        },
      ]
    },
    {
      room: "A04",
      slots: [
        {
          id: 0,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 1,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 2,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 3,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 5,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 6,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 7,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 8,
          from: "12:00",
          until: "14:00",
          booked: false
        },
      ]
    },
    {
      room: "A05",
      slots: [
        {
          id: 0,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 1,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 2,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 3,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 5,
          from: "08:00",
          until: "10:00",
          booked: false
        },
        {
          id: 6,
          from: "10:00",
          until: "12:00",
          booked: false
        },
        {
          id: 7,
          from: "12:00",
          until: "14:00",
          booked: false
        },
        {
          id: 8,
          from: "12:00",
          until: "14:00",
          booked: false
        },
      ]
    },
  ];

router.get('/:day', async function (req, res, next) {
    let result = await room_calls.getDay(req.params.day);
    console.log("RESULT IS", result);
    res.status(200).send(result); 
    return result;
})

router.get('/book/:id', async function (req, res, next) {
    let result = await room_calls.book(req.params.id);
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

module.exports = router;