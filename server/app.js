const express = require('express');
const app = express();
const path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');

app.disable("x-powered-by");

let bookingRouter = require('./routes/booking-router');
let bookingsRouter = require('./routes/bookings-router');
let roomRouter = require('./routes/room-router');
let roomsRouter = require('./routes/rooms-router');
let dayRouter = require('./routes/day-router')

let initDb = require('./init-db');

app.get('/', (req, res) => res.send('Hello. This is the /booking-api'))

app.listen(8080);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/booking', bookingRouter);
app.use('/bookings', bookingsRouter);
app.use('/room', roomRouter);
app.use('/rooms', roomsRouter);
app.use('/day', dayRouter);

console.log("Server running on 8080")

initDb.init();

module.exports = app;
