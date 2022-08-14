const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please Provide email'],
        //mongoose email validator
        validate:{
            validator: validator.isEmail,
            message: 'Please provide a valid Email',
        }
    },
    password:{
        type: String,
        required: [true, 'Please Provide email'],
        minlength: 6,
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default: 'user',
    },
})

module.exports = mongoose.model('User', UserSchema)