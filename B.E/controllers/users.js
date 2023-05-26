const { validationResult } = require('express-validator')
const User=require('../models/users')

module.exports.register=async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        const error=new Error('Validation failed!')
        error.status=422

        error.data = errors.array().map((err) => ({ [err.path]: err.msg }));

    throw error
    }

    const{name,id,email,password}=req.body
    try {
        const user=new User({name,id,email,password})
        await user.save()
        res.status(201).send({accessToken:'jhgjg',user:{id,email,name}})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }

}