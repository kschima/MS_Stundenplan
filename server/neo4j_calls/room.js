import Env from '../config/Env.js'

let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver(Env.DB_URL, neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.getAllRooms = async function () {
    let session = driver.session();
    let rooms = "No Rooms Were Found";
    try {
        rooms = await session.run('MATCH (r:Room) RETURN r', {
        });
        let results = await rooms.records.map(row => {
            return row.get(0).properties;
        })
        return results;
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
