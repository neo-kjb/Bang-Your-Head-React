const express = require('express')

const router = express.Router()
const { createConcertValidation, editConcertValidation } = require('../config/validation');
const { getAllConcerts,getConcertDetails,addConcert,deleteConcert,editConcert } = require('../controllers/concerts');



router.get('/',getAllConcerts);

router.get('/:id',getConcertDetails);

router.post('/', createConcertValidation,addConcert)

router.delete('/:id',deleteConcert)

router.patch('/:id',editConcertValidation,editConcert)


module.exports=router