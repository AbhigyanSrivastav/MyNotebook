const jwt = require('jsonwebtoken');
const env= require('dotenv');
env.config();

const SIGNATURE=process.env.SIGNATURE

const fetchuser=(req,res,next) =>{

    let token =req.header('authToken')
    if(!token){
        return res.status(403).send({error:'Access-Denied'})
    }
    try{
    let decoded = jwt.verify(token, SIGNATURE);
    req.user=decoded.user
    next()
    }catch(error){
        return res.status(403).send({error:error.message})
    }
}

module.exports=fetchuser