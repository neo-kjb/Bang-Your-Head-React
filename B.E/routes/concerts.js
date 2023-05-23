const express = require('express')
const router = express.Router()

router.get('/concerts') //fetch concerts

router.post('/concerts') //add concert

router.get('/concerts/:id')// fetch concert details

router.delete('/concerts/:id') //del concert

router.patch('/concerts/:id') //edit concert


module.exports=router