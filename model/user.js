const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const {Schema} = mongoose

const UserSchema = new Schema ({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})


module.exports= mongoose.model('User',UserSchema)