const express = require("express");
const connectDB = require('./config/db')
const dotenv = require("dotenv");
const userRoutes = require('./controllers/userController');

dotenv.config({path: '../.env'});
connectDB();


const app = express();
app.use(express.json());

app.use('/users',userRoutes)


const Port = process.env.PORT;
app.listen(Port,() =>{
  console.log("server is running on port", Port);
})