const express = require('express')
const router = express.Router()
const User=require('../models/users')



router.post('/users',async(req,res)=>{
    const{name,id,email,password}=req.body
    const user=new User({name,id,email,password})
    await user.save()
})


router.post('/login',(req,res)=>{
    console.log(req.body);
})

module.exports=router