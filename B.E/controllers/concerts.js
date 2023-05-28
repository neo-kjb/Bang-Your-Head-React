const Concert=require('../models/concerts')

const{validationResult}=require('express-validator')


module.exports.getAllConcerts= async (req, res,next) => {
    try {
      const concerts = await Concert.find({});
      res.status(200).json(concerts);
      console.log('hh');
    } catch (error) {
      console.error(error);
      error.status(500)
      next(error)
    }
  }

module.exports.getConcertDetails= async (req, res,next) => {
    try {
      const concertId = req.params.id;
      const concert = await Concert.findOne({ id: concertId });

      if(!concert){
        const error = new Error('Could not find concert.')
        error.status=404
        throw error
      }
      console.log(concert);
      res.status(200).json([concert]);
    } catch (error) {
      if (!error.status) {
        error.status = 500;
      }
      next(error)
    }
  }



module.exports.addConcert=async (req,res,next)=>{
    const errors=validationResult(req)
    console.log(errors); 
    if(!errors.isEmpty()){
      const error=new Error('Validation failed!')
      error.status=422

      error.data = errors.array().map((err) => ({ [err.path]: err.msg }));

      throw error
    }


    const{title,id,price,userId,description,location,imageUrl}=req.body


    try {
      const concert=new Concert({title,id,price,userId,description,location,imageUrl})
      await concert.save()
      res.status(201).json({message:'Concert Created Successfully',concert})
    } catch (error) {
      if (!error.status) {
        error.status = 500;
      }
      next(error)
    }

}



module.exports.editConcert=async(req,res,next)=>{
    const concertId=req.params.id
    const errors=validationResult(req)
    console.log(errors); 
    if(!errors.isEmpty()){
      const error=new Error('Validation failed!')
      error.status=422

      error.data = errors.array().map((err) => ({ [err.path]: err.msg }));

      throw error
    }
    const{title,price,location,description,imageUrl}=req.body

    try {
        const concert = await Concert.findOneAndUpdate({ id: concertId },{title,price,location,description,imageUrl},{new:true});
  
        if(!concert){
          const error = new Error('Could not find concert.')
          error.status=404
          throw error
        }
        console.log(concert);
        res.status(200).json([concert]);
      } catch (error) {
        if (!error.status) {
            error.status=500
      }
        next(error)
      }}


module.exports.deleteConcert=async(req,res,next)=>{
    const concertId=req.params.id

    const userId=req.userId

    if(!userId){
      const error = new Error('Not Authorized!')
      error.status=401
      next(error)
      return
    }
    try {
        const concert=await Concert.findOne({id:concertId})
        if(!concert){
            const error = new Error('Could not find concert.')
            error.status=404
            throw error
          }

          if(!concert.userId===userId){
            const error = new Error('Not Authorized!')
            error.status=401
            next(error)
            return
          }

          await Concert.findOneAndRemove({id:concertId})
          res.status(200).json({message:'Concert Deleted'})
    } catch (error) {
      if (!error.status) {
        error.status=500
         }
      next(error)
    }
}