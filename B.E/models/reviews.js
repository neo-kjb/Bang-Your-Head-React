const mongoose= require('mongoose')
const Schema=mongoose.Schema

const ReviewSchema=new Schema({
    reviewText:{ 
        type:String,
        required:true
    },
    reviewRating:{ 
        type:Number,
        required:true
    },
    userId:{ 
        type:String,
        required:true
    },
    userName:{ 
        type:String,
        required:true
    },
    concertId:{ 
        type:String,
        required:true
    },
    id:{ 
        type:String,
        required:true
    }
})

module.exports=mongoose.model('review',ReviewSchema)