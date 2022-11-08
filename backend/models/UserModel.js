const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password:{
        type:String,
        required:true,
        min:5
    }
});
const UserModel = mongoose.model('User',UserSchema)
module.exports =UserModel;


