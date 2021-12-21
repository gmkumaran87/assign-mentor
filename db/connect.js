const { MongoClient } = require("mongodb");

const connectDb = async() => {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        console.log("DB Connected...");
        return client;
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;