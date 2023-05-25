const express = require('express')
const router = express.Router()
const User=require('../models/users')



router.post('/users',async(req,res)=>{
    const{name,id,email,password}=req.body
    try {
        const user=new User({name,id,email,password})
        await user.save()
        res.status(201).send({accessToken:'jhgjg',user:{id,email,name}})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }

})


router.post('/login',(req,res)=>{

    console.log(req.body);
    res.send({accessToken:'jhgjg',user:{id:123,email:'hgfhg@jhg.com',name:'anas'}})
})

module.exports=router