const express = require('express')
const router = express.Router()

router.get('/reviews/:concertId')//fetch reviews

router.post('/reviews') //add review

router.delete('/reviews/:id') //del review


module.exports=router