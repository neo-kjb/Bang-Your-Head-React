const express = require('express')
const router = express.Router()
const Concert=require('../models/concerts')

router.get('/concerts', async (req, res) => {
    try {
      const concerts = await Concert.find({})
      console.log(concerts);
      res.status(200).send(concerts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.post('/concerts',async (req,res)=>{
    const{title,id,price,userId,description,location,imageUrl}=req.body
    const concert=new Concert({title,id,price,userId,description,location,imageUrl})
    await concert.save()
}) //add concert

router.get('/concerts/:id')// fetch concert details

router.delete('/concerts/:id') //del concert

router.patch('/concerts/:id') //edit concert


module.exports=router