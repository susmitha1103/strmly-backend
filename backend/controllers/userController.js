const USER = require('../models/users');
const bcrypt = require('bcrypt');
const {signToken} = require('../middleware/protect');



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
};


const userLogin = async(req,res) =>{
  const{email, password} = req.body;

  if(!email || !password){
    console.log("first check");
    return res.status(400).json({message: "fields  email, and password are required"});
  }

  try{
    const existingUser = await USER.findOne({email});

    if (!existingUser){
      return res.status(400).json({ message: "Incorrect email or password" });
    }

     const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    const token = signToken(existingUser._id);
    

    res.status(200).json({
      message: `${existingUser.username} logged in successfully`,
      token:`${token}`
    });
  }
    catch(error){
      console.error("Error logging in",error.message);
      res.status(500).json({message: "Internal server error"});
    }
  };
  
  const getProfile = async (req, res) => {
    console.log("getProfile route reached");
  try {
    const userId = req.user.id;
    console.log("userid",userId);
    const userInfo = await USER.findById(userId).lean();

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details fetched",
      user: {
        id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email
      }
    });

  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

  

module.exports = {signupUser,userLogin,getProfile};