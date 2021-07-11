module.exports = {
    DB_URL: process.env.DATABASE_URL ? process.env.DATABASE_URL : "bolt://0.0.0.0:7687",
    DB_USER: process.env.DATABASE_USER ? process.env.DATABASE_USER : "neo4j",
    DB_PASSWORD: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "neo4j",
    DB_NAME: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : ""
}
