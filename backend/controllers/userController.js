const USER = require('../models/users');
const bcrypt = require('bcrypt');

const signupUser = async(req,res) =>{
  const {username, email, password} = req.body;

  if(!username || !email || !password){
    return res.status(400).json({message: "fields username, email, and password are required"});
  }

  if(username.length < 6 || password.length < 6){
    return res.status(400).json({message: "username and password must contain atleast 6 chracters"});
  }

  if(username.length > 15 || password.length > 15){
    return res.status(400).json({message: "length of username or password exceded"});
  }

  try{

    const existingUser = await USER.findOne({email});
    if(existingUser){
      return res.status(400).json({message: "Email already registered"});
    }

    const hashsedPassword = await bcrypt.hash(password,10);
    
    const newUser = new USER({
      username,
      email,
      password : hashsedPassword,
    });

    await newUser.save();
    res.status(201).json({message: `${newUser.username} signed up successfully`})
  }
  catch(error){
    console.error("error signing up",error.message);
    res.status(500).json({message: "Internal server error"});
  }


}
module.exports = signupUser;