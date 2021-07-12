let Env = require("../config/Env");

let neo4j = require('neo4j-driver');
let driver = neo4j.driver(Env.DB_URL, neo4j.auth.basic(Env.DB_USER, Env.DB_PASSWORD));

exports.getAllRooms = async function () {
    let session = driver.session();
    let rooms = "No Rooms Were Found";
    try {
        rooms = await session.run('MATCH (r:Room) RETURN r', {
        });
        return await rooms.records.map(row => {
            return row.get(0).properties;
        });
    }
    catch (err) {
        console.error(err);
        return rooms;
    }
    finally {
        session.close();
    }
}

exports.getRoom = async function (id) {
    let session = driver.session();
    let room = "No Room Was Found with id: " + id;
    try {
        room = await session.run('MATCH (r:Room) WHERE r.id = $id RETURN r', {
            id: id
        });
        return room.records[0].get(0).properties;
    }
    catch (err) {
        console.error(err);
        return room;
    }
    finally {
        session.close();
    }
}

exports.updateRoom = async function (id, name, description) {
    let session = driver.session();
    let room = "No Room Was Updated";
    try {
        room = await session.run('MATCH (r:Room) WHERE r.id = $id SET r.name = $name, r.description = $description RETURN r', {
            id: id,
            name: name,
            description: description
        });
    }
    catch (err) {
        console.error(err);
        return room;
    }
    finally {
        session.close();
    }
    return room.records[0].get(0).properties.name;
}

exports.createRoom = async function (id, name, description) {
    let session = driver.session();
    let room = "No Room Was Created";
    try {
        room = await session.run('CREATE (n:Room {id: $id, name: $name, description: $description}) RETURN n', {
            id: id,
            name: name,
            description: description
        });
    }
    catch (err) {
        console.error(err);
        return room;
    }
    finally {
        session.close();
    }
    return room.records[0].get(0).properties.name;
}

exports.deleteRoom = async function (id) {
    let session = driver.session();
    let room = "No Room Was Deleted";
    try {
        room = await session.run('MATCH (r:Room) WHERE r.id = $id DETACH DELETE r RETURN r', {
            id: id
        });
    }
    catch (err) {
        console.error(err);
        return room;
    }
    finally {
        session.close();
    }
    return room.records[0].get(0).properties.name;
}

exports.createDay = async function (date) {
    let session = driver.session();
    let day = "No Date Was Created";
    try {
        day = await session.run('CREATE (d:Date {date: $date}) RETURN d', {
            date: date
        });
    }
    catch (err) {
        console.error(err);
        return day;
    }
    finally {
        session.close();
    }
    return day.records[0].get(0).properties.date;
}

exports.createRoomDate = async function (date, name, description) {
    let session = driver.session();
    let room = "No Room Was Created";
    try {
        room = await session.run('MATCH (d:Date) WHERE d.date = $date CREATE (n:RoomDate {name: $name, description: $description})-[:ROOM_DAY]->(d) RETURN n', {
            date: date,
            name: name,
            description: description
        });
    }
    catch (err) {
        console.error(err);
        return room;
    }
    finally {
        session.close();
    }
    //return room.records[0].get(0).properties.name;
    return room.records[0];
}

exports.createSlotRoom = async function (date, name, id, from, until, booked) {
    let session = driver.session();
    let slot = "No Room Was Created";
    try {
        slot = await session.run('MATCH (d:Date {date: $date})<-[:ROOM_DAY]-(r:RoomDate {name: $name}) CREATE (s:Slot {id: $id, from: $from, until: $until, booked: $booked})-[:SLOT_ROOM]->(r) return d,r,s', {
            date: date,
            name: name,
            id: id,
            from: from,
            until: until,
            booked: booked
        });
    }
    catch (err) {
        console.error(err);
        return slot;
    }
    finally {
        session.close();
    }
    return slot.records[0].get(0);
}

exports.getDay = async function (date) {
    let session = driver.session();
    let day = "Nothing found for date: " + date;
    try {
        day = await session.run('match (d:Date {date: $date})<-[:ROOM_DAY]-(r:RoomDate)<-[:SLOT_ROOM]-(s) RETURN {room: r.name, slots:collect(s)}', {
            date:date
        });
        return await day.records.map(row => {
            return row.get(0);
        });
    }
    catch (err) {
        console.error(err);
        return day;
    }
    finally {
        session.close();
    }
}

exports.book = async function (id) {
    let session = driver.session();
    let day = "Nothing booked: " + id;
    try {
        day = await session.run('match (r) where id(r) = toInteger($id) SET r.booked = true return r', {
            id:id
        });
        return day.get(0);
    }
    catch (err) {
        console.error(err);
        return day;
    }
    finally {
        session.close();
    }
}

exports.myBookings = async function (userId) {
    let session = driver.session();
    let bookings = "Nothing booked: " + userId;
    try {
        bookings = await session.run('match (s:Slot) where s.userId = $userId return s', {
            id:id
        });
        return bookings.get(0);
    }
    catch (err) {
        console.error(err);
        return bookings;
    }
    finally {
        session.close();
    }
}
