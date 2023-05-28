const { validationResult } = require('express-validator')
const User=require('../models/users')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')

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



module.exports.login=async (req,res,next)=>{

    const {email,password}=req.body
    let loadedUser
    try {
        const user=await User.findOne({email})
        if(!user){
            const error=new Error('User Not Found!')
            error.status=401
            next(error)
            return
        }
        loadedUser=user
        const isEqual=await bcrypt.compare(password,user.password)
        if(!isEqual){
            const error=new Error('Wrong Password!')
            error.status=401
            next(error)
            return
        }

        const accessToken=jwt.sign({email:loadedUser.email,id:loadedUser.id,name:loadedUser.name},'@#}†',{expiresIn:'1h'})
        res.status(200).send({accessToken,user:{id:loadedUser.id,email:loadedUser.email,name:loadedUser.name}})

    } catch (error) {
        if(!error.status){
        error.status=500
        }
        next(error)
    }
}