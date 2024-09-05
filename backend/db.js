const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017"

const ConnectToMongo = () => {
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to MongoDB")
    })
}

module.exports = ConnectToMongo;