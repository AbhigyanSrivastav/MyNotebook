//connecting to MongoDb using Mongoose
const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/mynotebook";

const connectMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to MongoDB')
    });

}

module.exports = connectMongo;