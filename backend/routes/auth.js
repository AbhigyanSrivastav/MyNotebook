const express = require('express');
const User = require('../models/UserModel')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env= require('dotenv');
const fetchuser= require('../middleware/fetchuser');
env.config();
const router = express.Router();

const SIGNATURE=process.env.SIGNATURE
//Route 1: Creating User,Login Not Required,POST method,param:name,email,password 
router.post(
    '/signup',
    [
    body("name", "Enter a valid name")
    .notEmpty()
    .isLength({min:3}),
    // username must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body('password', 'Must be at least 5 characters long')
        .isLength({ min: 5 })
        .matches(/\d/)
        .withMessage('Must contain a number'),
    ],
    async (req, res) => {

        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const { name, email, password } = req.body;
            let user=await User.findOne({ email: email});
            if (user){
                return res.status(400).json({ success, error:"User already exists"});
            }
            const passValidation=(pass) =>{
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(pass, salt);
                return hash;
            }

             user = await User.create({
                name: name,
                email: email,
                password: passValidation(password)
            })
            let data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, SIGNATURE);

            success = true;
            res.send({ success, authToken })

        } catch (err) {
            console.error(err.message);
            res.status(500).send({success,message: err.message });
    }
    })
//Route 2: Logging User In,Login Not Required,POST method,param:email,password 
router.post(
    '/login',
    [
    // username must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body('password', 'must be at least 5 chars long').notEmpty()
    ],
    async (req, res) => {

        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const {email, password } = req.body;
            let user=await User.findOne({ email: email});
            if (!user){
                return res.status(400).json({ success, error:"Invalid Credentials"});
            }

            let passValidation=bcrypt.compareSync(password, user.password);
            if (!passValidation){
                return res.status(400).json({ success, error:"Invalid Credentials"});
            }

            let data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, SIGNATURE);

            success = true;
            res.send({ success, authToken })

        } catch (err) {
            console.error(err.message);
            res.status(500).send({success, message: err.message });
    }
    })

//Route 3: Fetching User,Login Required,POST method,param:JWT Token 

router.post('/fetchuser', fetchuser,async(req, res) => {

success=false
try{
    let userId=req.user.id
    let user=await User.findById(userId).select("-password")
    success=true
    res.send({success,user})
}catch (err){
    res.status(500).json({success, error: err.message});
}
})
module.exports = router


