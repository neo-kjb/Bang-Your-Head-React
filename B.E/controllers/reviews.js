const { validationResult } = require('express-validator')
const Review=require('../models/reviews')


module.exports.deleteReview=async(req,res,next)=>{
    const reviewId=req.params.id
    const userId=req.userId

    if(!userId){
        const error = new Error('Not Authorized!')
        error.status=401
        next(error)
        return
      }




      try {
        const review=await Review.findOne({id:reviewId})
        if(!review){
            const error = new Error('Could not find review.')
            error.status=404
            next(error)
          }

          if(review.userId!==userId){
            const error = new Error('Not Authorized!')
            error.status=401
            next(error)
            return
          }

          await Review.findOneAndRemove({id:reviewId})
          res.status(200).json({message:'Review Deleted'})
    } catch (error) {
      if (!error.status) {
        error.status=500
         }
      next(error)
    }

}


module.exports.fetchReviews=async(req,res,next)=>{
  const concertId=req.params.concertId


  try {
      const reviews= await Review.find({concertId:concertId})
      res.status(200).json(reviews)
  } catch (error) {
    if (!error.status) {
      error.status=500
       }
    next(error)
  }
}



module.exports.addReview=async(req,res,next)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    const error=new Error('Validation failed!')
    error.status=422

    error.data = errors.array().map((err) => ({ [err.path]: err.msg }));

    next(error)
    return
  }

  const authUser= req.userId
  const {reviewText,reviewRating,userId,userName,concertId,id}=req.body

  if(authUser!==userId){
    const error = new Error('Not Authorized!')
    error.status=401
    next(error)
    return
  }

      try {
          const review=new Review({reviewText,reviewRating,userId,userName,concertId,id})
          await review.save()
          res.status(201).json({message:'Review Created Successfully', review})

      } catch (error) {
        if (!error.status) {
          error.status = 500;
        }
        next(error)
      }
}