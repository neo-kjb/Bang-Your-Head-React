const {body}=require('express-validator')


module.exports.createConcertValidation=[
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('id').trim().notEmpty().withMessage('ID is required'),
    body('price')
      .trim()
      .notEmpty().withMessage('Price is required')
      .isNumeric().withMessage('Price must be a number'),
    body('userId').trim().notEmpty().withMessage('UserID is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('imageUrl')
      .trim()
      .notEmpty().withMessage('Image URL is required')
      .isURL().withMessage('Image URL must be a valid URL'),
  ]