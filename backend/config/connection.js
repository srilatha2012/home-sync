//Import mongoose package to connect MongoDB
const mongoose = require("mongoose");

//Get MONGO_URI connection string from .env file
const MONGO_URI = process.env.MONGO_URI;

//function to connect to MongoDB
async function dbConnection() {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("Backend application successfully connected to MongoDB ");
};

module.exports = dbConnection;