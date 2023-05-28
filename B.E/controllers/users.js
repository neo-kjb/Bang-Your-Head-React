const { validationResult } = require('express-validator')
const User=require('../models/users')
const bcrypt=require("bcryptjs")

module.exports.register=async(req,res,next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        const error=new Error('Validation failed!')
        error.status=422
        error.data = errors.array().map((err) => ({ [err.path]: err.msg }));
    next(error)
    return
    }

    
    try {
        const{name,id,email,password}=req.body
        const hashedPw=await bcrypt.hash(password,12)
        const user=new User({name,id,email,password:hashedPw})
        await user.save()
        res.status(201).json({accessToken:'jhgjg',user:{id,email,name}})
    } catch (error) {
        if(!error.status){
            error.status=500
        }
        next(error)
    }

}