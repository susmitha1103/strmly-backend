const express = require("express");
const connectDB = require('./config/db')
const helmet = require('helmet');
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const rateLimiter = require('./middleware/rateLimit')
const cors = require('cors');

dotenv.config({path: '../.env'});
connectDB();


const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setTimeout(20000, () => { 
    return res.status(408).json({ message: 'Request timed out' });
  });
  next();
});

app.use(rateLimiter);


app.use('/users',userRoutes)
app.use('/videos',videoRoutes);


const Port = process.env.PORT;
app.listen(Port,() =>{
  console.log("server is running on port", Port);
})