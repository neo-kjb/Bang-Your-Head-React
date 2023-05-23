const express = require('express')
const router = express.Router()
const Review = require('../models/reviews')

router.get('/reviews/:concertId',async(req,res)=>{
    try {
        const reviews= await Review.find()
        res.send(reviews)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})//fetch reviews

router.post('/reviews',async(req,res)=>{
    const {reviewText,reviewRating,userId,userName,concertId,id}=req.body

        try {
            const review=new Review({reviewText,reviewRating,userId,userName,concertId,id})
            await review.save()

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });

        }
})

router.delete('/reviews/:id',async(req,res)=>{
    const reviewId=req.params.id
    try {
        await Review.findOneAndDelete({id:reviewId})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
})


module.exports=router