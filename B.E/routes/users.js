const express = require('express')
const router = express.Router()


const { signUpValidation } = require('../config/validation')
const { register, login, auth, logout } = require('../controllers/users')
const { isAuth } = require('../middleware')



router.post('/users',signUpValidation,register)

router.post('/login',login)

router.get('/auth',isAuth,auth)
router.post('/logout',logout)



module.exports=router