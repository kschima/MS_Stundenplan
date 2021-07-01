let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver("bolt://0.0.0.0:7687", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.getRooms = async function () {
    let session = driver.session();
    const rooms = await session.run('MATCH (r:Room) RETURN r', {
    });
    session.close();
    console.log("RESULT", (!rooms ? 0 : rooms.records));
    return (!rooms ? 0 : rooms.records);
}

exports.getRoom = async function (id) {
    let session = driver.session();
    const room = await session.run('MATCH (r:Room) WHERE r.id = $id RETURN r', {
        id: id
    });
    session.close();
    console.log("RESULT", (!room ? 0 : room.records));
    return (!room ? 0 : room.records);
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
    return room.records[0].get(0).properties.name;
}

exports.deleteRoom = async function (id) {
    let session = driver.session();
    let room = "No Room Was Deleted";
    try {
        room = await session.run('MATCH (r:Room) WHERE r.id = $id DELETE r RETURN r', {
            id: id
        });
    }
    catch (err) {
        console.error(err);
        return room;
    }
    return room.records[0].get(0).properties.name;
}
