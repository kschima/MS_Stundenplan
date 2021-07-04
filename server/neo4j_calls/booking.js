import Env from '../config/Env.js'

let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver(Env.DB_URL, neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.getAllBookings = async function () {
    let session = driver.session();
    let bookings = "No Bookings Were Found";
    try {
        bookings = await session.run('MATCH (b:Booking) RETURN b', {
        })
        let results = await bookings.records.map(row => {
            return row.get(0).properties;
        })
        return results;
    }
    catch (err) {
        console.error(err);
        return bookings;
    }
    finally {
        session.close();
    }
}

exports.getBookingsByUserId = async function (userId) {
    let session = driver.session();
    let bookings = "No Bookings Were Found for userId: " + userId;
    try {
        bookings = await session.run('MATCH (b:Booking) WHERE b.userId = $userId RETURN b', {
            userId: userId
        })
        let results = await bookings.records.map(row => {
            return row.get(0).properties;
        })
        return results;
    }
    catch (err) {
        console.error(err);
        return bookings;
    }
    finally {
        session.close();
    }
}

exports.getBookingsByDate = async function (date) {
    let session = driver.session();
    let bookings = "No Bookings Were Found for date: " + date;
    try {
        bookings = await session.run('MATCH (b:Booking) WHERE b.date = $date RETURN b', {
            date: date
        })
        let results = await bookings.records.map(row => {
            return row.get(0).properties;
        })
        return results;
    }
    catch (err) {
        console.error(err);
        return bookings;
    }
    finally {
        session.close();
    }
}

//TODO: no booking
exports.getBooking = async function (id) {
    let session = driver.session();
    let booking = "No Booking Was Found for id: " + id;
    try {
        booking = await session.run('MATCH (b:Booking) WHERE b.id = $id RETURN b', {
            id: id
        })
        // let results = await booking.records.map(row => {
        //     return row.get(0).properties;
        // })
        return booking.records[0].get(0).properties;
    }
    catch (err) {
        console.error(err);
        return booking;
    }
    finally {
        session.close();
    }
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
    finally {
        session.close();
    }
    return booking.records[0].get(0).properties;
}

//TODO: SET article.datePublished = date("2019-09-30")
exports.createBooking = async function (id, roomId, userId, date, from, until, courseBooking) {
    let session = driver.session();
    let booking = "No Booking Was Created";
    //'MATCH (r:Room) WHERE r.id = $roomId CREATE (b:Booking {id: $id, roomId: $roomId, userId: $userId, date: date($date), from: $from, until: $until, courseBooking: $courseBooking})-[rel:IN_ROOM]->(r) RETURN b'
    try {
        booking = await session.run('CREATE (b:Booking {id: $id, roomId: $roomId, userId: $userId, date: $date, from: $from, until: $until, courseBooking: $courseBooking}) RETURN b', {
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
    finally {
        session.close();
    }
    return booking.records[0].get(0).properties;
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
    finally {
        session.close();
    }
    return booking;
}