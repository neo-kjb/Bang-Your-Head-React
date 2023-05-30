const {body}=require('express-validator')

const User = require('../models/users')


module.exports.createConcertValidation=[
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('id').trim().notEmpty().withMessage('ID is required'),
    body('price')
      .trim()
      .notEmpty().withMessage('Price is required')
      .isNumeric().withMessage('Price must be a number'),
    body('userId').trim().notEmpty().withMessage('Please sign in'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('imageUrl')
      .trim()
      .notEmpty().withMessage('Image URL is required')
      .isURL().withMessage('Image URL must be a valid URL'),
  ]


  module.exports.editConcertValidation=[
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('price')
      .trim()
      .notEmpty().withMessage('Price is required')
      .isNumeric().withMessage('Price must be a number'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('imageUrl')
      .trim()
      .notEmpty().withMessage('Image URL is required')
      .isURL().withMessage('Image URL must be a valid URL'),
  ]


  module.exports.signUpValidation=[
    body('email').isEmail().withMessage('Please enter a valid email.').custom((val,{req})=>{
      return User.findOne({email:val}).then(user=>{
        if(user){
          return Promise.reject('E-Mail address already exists!')
        }
      })
    }).normalizeEmail(),
    body('password').trim().isLength({min:8}).withMessage('Password must be more than 8 characters'),
    body('name').trim().notEmpty(),
    body('id').trim().notEmpty()
  ]



  module.exports.addReviewValidation = [
    body('reviewText').trim().notEmpty().withMessage('Review text is required'),
    body('reviewRating')
      .trim()
      .notEmpty().withMessage('Review rating is required')
      .isNumeric().withMessage('Review rating must be a number'),
    body('userId').trim().notEmpty().withMessage('User ID is required'),
    body('userName').trim().notEmpty().withMessage('User name is required'),
    body('concertId').trim().notEmpty().withMessage('Concert ID is required'),
    body('id').trim().notEmpty().withMessage('ID is required'),
  ]