const jwt=require('jsonwebtoken')

module.exports.isAuth=(req,res,next)=>{
    const authHeader=req.get('Authorization')
    if(!authHeader){
        const error=new Error('Not Authenticated')
        error.status=401
        throw error
    }
    const token=authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken=jwt.verify(token,'@#}†')
    } catch (error) {
        error.status=500
        throw error
    }
    if(!decodedToken){
        const error= new Error('Not Authenticated.')
        error.status=401
        throw error
    }
    req.userId=decodedToken.id
    next()
}