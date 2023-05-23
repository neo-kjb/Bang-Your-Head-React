const express = require('express')
const router = express.Router()
const Concert=require('../models/concerts')



router.get('/', async (req, res) => {
    try {
      const concerts = await Concert.find({});
      res.status(200).send(concerts);
      console.log('hh');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


router.get('/:id', async (req, res) => {
    try {
      const concertId = req.params.id;
      const concert = await Concert.findOne({ id: concertId }).exec();
      console.log(concert);
      res.send([concert]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  


  

router.post('/',async (req,res)=>{
    const{title,id,price,userId,description,location,imageUrl}=req.body
    const concert=new Concert({title,id,price,userId:'j',description,location,imageUrl})
    await concert.save()
}) //add concert


router.delete('/:id') //del concert

router.patch('/:id') //edit concert


module.exports=router