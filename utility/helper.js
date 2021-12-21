const connectDb = require("../db/connect");

const dbConnection = async() => {
    const client = connectDb();
    const db = (await client).db("Mentors");
    return db;
};

module.exports = dbConnection;