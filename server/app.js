const express = require('express');
const app = express();
const path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');    //Extract data from Express

app.use(cors())

let booking = require('./routes/booking');
let bookings = require('./routes/bookings');
let room = require('./routes/room');
let rooms = require('./routes/rooms');

app.get('/', (req, res) => res.send('Response from Express'))

app.listen(8080);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/booking', booking);
app.use('/bookings', bookings);
app.use('/room', room);
app.use('/rooms', rooms);

console.log("Server running on 8080")

module.exports = app;