const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING || process.env.LOCAL_CONNECTION_STRING;

async function connectDB() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (err) {
        throw new Error("Database connection failed: " + err.message);
    }
}

connectDB();

module.exports = mongoose;
