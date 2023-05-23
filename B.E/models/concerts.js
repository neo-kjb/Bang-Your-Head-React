const mongoose= require('mongoose')
const Schema=mongoose.Schema


const ConcertSchema=new Schema(
    {
        title:{ 
            type:String,
            required:true
        },
        id:{
            type:String,
            unique:true
        },
        price: {
            type:Number,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        },
        userId: {
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model('Concert',ConcertSchema)