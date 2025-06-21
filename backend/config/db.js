const mongoose = require("mongoose");

const connectDB = async() =>{
  try{
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to mongodb at port",conn.connection.host);
}
catch(error){
  console.error("Mongodb connection failed",error);
  process.exit(1);
}
};

module.exports = connectDB;
