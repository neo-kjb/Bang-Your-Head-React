const express = require('express')

const router = express.Router()
const concertsController=require('../controllers/concerts')
const validation=require('../config/validation')



router.get('/',concertsController.getAllConcerts);

router.get('/:id',concertsController.getConcertDetails);

router.post('/', validation.createConcertValidation,concertsController.addConcert)

router.delete('/:id') //del concert

router.patch('/:id') //edit concert


module.exports=router