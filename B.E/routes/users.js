const express = require('express')
const router = express.Router()


const { signUpValidation } = require('../config/validation')
const { register, login, auth } = require('../controllers/users')
const { isAuth } = require('../middleware')



router.post('/users',signUpValidation,register)

router.post('/login',login)

router.get('/auth',isAuth,auth)



module.exports=router