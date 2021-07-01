let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver("bolt://0.0.0.0:7687", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.getBookings = async function () {

}

exports.getBookingsByUserId = async function (userId) {

}

exports.getBooking = async function (id) {

}

exports.updateBooking = async function (id) {

}

exports.create_booking = async function (name) {
    let session = driver.session();
    let booking = "No Booking Was Created";
    try {
        booking = await session.run('CREATE (n:booking {name: $id})', {
            id: name
        });
    }
    catch (err) {
        console.error(err);
        return booking;
    }
    return booking.records[0].get(0).properties.name;
}

exports.deleteBooking = async function (id) {

}
