const express = require('express')
const router = express.Router()


const { signUpValidation } = require('../config/validation')
const { register, login } = require('../controllers/users')



router.post('/users',signUpValidation,register)

router.post('/login',login)



module.exports=router