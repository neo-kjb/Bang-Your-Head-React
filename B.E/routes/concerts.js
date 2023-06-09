const express = require('express')

const router = express.Router()
const { createConcertValidation, editConcertValidation } = require('../config/validation');
const { getAllConcerts,getConcertDetails,addConcert,deleteConcert,editConcert } = require('../controllers/concerts');
const { isAuth } = require('../middleware');



router.get('/',getAllConcerts);

router.get('/:id',getConcertDetails);

router.post('/', isAuth,createConcertValidation,addConcert)

router.delete('/:id',isAuth,deleteConcert)

router.patch('/:id',isAuth,editConcertValidation,editConcert)


module.exports=router