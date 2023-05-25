const Concert=require('../models/concerts')

const{validationResult}=require('express-validator')


module.exports.getAllConcerts= async (req, res) => {
    try {
      const concerts = await Concert.find({});
      res.status(200).json(concerts);
      console.log('hh');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports.getConcertDetails= async (req, res) => {
    try {
      const concertId = req.params.id;
      const concert = await Concert.findOne({ id: concertId });

      if(!concert){
        const error = new Error('Could not find concert.')
        error.statusCode=404
        throw error
      }
      console.log(concert);
      res.status(200).json([concert]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



module.exports.addConcert=async (req,res)=>{
    const errors=validationResult(req)
    console.log(errors); 
    if(!errors.isEmpty()){
        const extractedErrors = errors.array().map((err) => ({ [err.path]: err.msg }));

        return res.status(422).json({
            errors:extractedErrors
        })
    }
    const{title,id,price,userId,description,location,imageUrl}=req.body
    const concert=new Concert({title,id,price,userId,description,location,imageUrl})
    await concert.save()
    res.status(200)
}



module.exports.editConcert=async(req,res)=>{
    const concertId=req.params.id
    const errors=validationResult(req)
    console.log(errors); 
    if(!errors.isEmpty()){
        const extractedErrors = errors.array().map((err) => ({ [err.path]: err.msg }));

        return res.status(422).json({
            errors:extractedErrors
        })
    }
    const{title,price,location,description,imageUrl}=req.body

    try {
        const concert = await Concert.findOneAndUpdate({ id: concertId },{title,price,location,description,imageUrl},{new:true});
  
        if(!concert){
          const error = new Error('Could not find concert.')
          error.statusCode=404
          throw error
        }
        console.log(concert);
        res.status(200).json([concert]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }}


module.exports.deleteConcert=async(req,res)=>{
    const concertId=req.params.id
    try {
        const concert=await Concert.findOne({id:concertId})
        if(!concert){
            const error = new Error('Could not find concert.')
            error.statusCode=404
            throw error
          }

          await Concert.findOneAndRemove({id:concertId})
          res.status(200).json({message:'Concert Deleted'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }
}