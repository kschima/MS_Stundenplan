const express = require('express');
const app = express();
const path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');    //Extract data from Express

app.use(cors())

let booking = require('./routes/booking');
let room = require('./routes/room');

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
app.use('/room', room);

console.log("Server running on 8080")

module.exports = app;