const jwt = require('jsonwebtoken');
const USER = require('../models/users')

const signToken = (userId) =>{
  return jwt.sign({
    id: userId
  },process.env.JWT_SECRET,{
    expiresIn: "1h"
  })
};

const verifyToken = (req,res,next) =>{
 
  const token = req.headers.authorization?.split(' ')[1];

  if(!token){
   return res.status(400).json({message: "token not provided"});
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  }
  catch(error){
    console.error(error);
    res.status(401).json({message: "Invalid or expired token"});
  }
};



module.exports = {signToken, verifyToken};