const express = require('express')
const router = express.Router()
const Review = require('../models/reviews')
const { deleteReview, fetchReviews, addReview } = require('../controllers/reviews')
const { isAuth } = require('../middleware')
const { addReviewValidation } = require('../config/validation')

router.get('/reviews/:concertId',fetchReviews)

router.post('/reviews',addReviewValidation,isAuth,addReview)

router.delete('/reviews/:id',isAuth,deleteReview)


module.exports=router