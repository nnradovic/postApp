const express = require('express');
const { body } = require('express-validator/check');
const User = require('../models/user');
const authController = require('../controllers/auth');
const bcrypt = require('bcryptjs')
const router = express.Router();

router.put('/signup', [
   body('email').isEmail().withMessage('Please enter a valid email.') 
   .custom((value, { req})=>{
       return User.findOne({email:value}).then(userDoc =>{
           if(userDoc){
               return Promise.reject('E-mail addres slready exsistis')
           }
       })
   })
   .normalizeEmail(),
   body('password').trim().isLength({min:5}),
   body('name').trim().not().isEmpty().isLength({min:5})
], authController.signup)

router.post('/login', authController.login)

module.exports = router;