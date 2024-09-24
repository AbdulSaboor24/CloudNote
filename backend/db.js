const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/CloudeNote2?directConnection=true&tls=false&readPreference=primary";
const ConnectToMongo = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

module.exports = ConnectToMongo;