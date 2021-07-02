let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver("bolt://0.0.0.0:7687", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.getAllBookings = async function () {
    let session = driver.session();
    let bookings = "No Bookings Were Found";
    try {
        bookings = await session.run('MATCH (b:Booking) RETURN b', {
        });
    }
    catch (err) {
        console.error(err);
        return bookings;
    }
    session.close();
    console.log("RESULT", (!bookings ? 0 : bookings.records));
    return bookings;
}

exports.getBookingsByUserId = async function (userId) {
    let session = driver.session();
    let bookings = "No Bookings Were Found for userId: " + userId;
    try {
        bookings = await session.run('MATCH (b:Booking) WHERE b.userId = $userId RETURN b', {
            userId: userId
        });
    }
    catch (err) {
        console.error(err);
        return bookings;
    }
    session.close();
    console.log("RESULT", (!bookings ? 0 : bookings.records));
    return bookings;
}

exports.getBooking = async function (id) {
    let session = driver.session();
    let booking = "No Booking Was Found";
    try {
        booking = await session.run('MATCH (b:Booking) WHERE b.id = $id RETURN b', {
            id: id
        });
    }
    catch (err) {
        console.error(err);
        return booking;
    }
    session.close();
    console.log("RESULT", (!booking ? 0 : booking.records));
    return booking;
}

//TODO: relationship update roomId
//TODO: SET article.datePublished = date("2019-09-30")
exports.updateBooking = async function (id, userId, date, from, until, courseBooking) {
    let session = driver.session();
    let booking = "No Booking Was Updated";
    try {
        booking = await session.run('MATCH (b:Booking) WHERE b.id = $id SET b.userId = $userId, b.date = $date, b.from = $from, b.until = $until, b.courseBooking = $courseBooking RETURN b', {
            id: id,
            userId: userId,
            date: date,
            from: from,
            until: until,
            courseBooking: courseBooking
        });
    }
    catch (err) {
        console.error(err);
        return booking;
    }
    session.close();
    return booking.records[0].get(0).properties.name;
}

//TODO: SET article.datePublished = date("2019-09-30")
exports.createBooking = async function (id, roomId, userId, date, from, until, courseBooking) {
    let session = driver.session();
    let booking = "No Booking Was Created";
    try {
        booking = await session.run('MATCH (r:Room) WHERE r.id = $roomId CREATE (b:Booking {id: $id, roomId: $roomId, userId: $userId, date: $date, from: $from, until: $until, courseBooking: $courseBooking})-[rel:IN_ROOM]->(r) RETURN b', {
            id: id,
            roomId: roomId,
            userId: userId,
            date: date,
            from: from,
            until: until,
            courseBooking: courseBooking
        });
    }
    catch (err) {
        console.error(err);
        return booking;
    }
    session.close();
    return booking;
}

exports.deleteBooking = async function (id) {
    let session = driver.session();
    let booking = "No Booking Was Deleted";
    try {
        booking = await session.run('MATCH (b:Booking) WHERE b.id = $id DETACH DELETE b RETURN b', {
            id: id
        });
    }
    catch (err) {
        console.error(err);
        return booking;
    }
    session.close();
    return booking;
}