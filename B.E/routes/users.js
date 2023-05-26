const express = require('express')
const router = express.Router()
const User=require('../models/users')
const { signUpValidation } = require('../config/validation')
const { register } = require('../controllers/users')



router.post('/users',signUpValidation,register)


router.post('/login',(req,res)=>{

    console.log(req.body);
    res.send({accessToken:'jhgjg',user:{id:123,email:'hgfhg@jhg.com',name:'anas'}})
})

module.exports=router