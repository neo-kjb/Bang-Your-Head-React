const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name:{
      type:String,
      required:true
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    id:{
      type:String,
      unique:true
    },
    password:{
      type:String,
      minlength:8,
      required:true
    }
  })

  module.exports=mongoose.model('user',UserSchema)