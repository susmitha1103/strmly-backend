const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username:{
  type: String,
  required: true
},
email:{
  type: String,
  required: true
},
password:{
  type:String,
  required: true
}
},{
  timeStamps: true
},
);

module.exports = new mongoose.model('User',userSchema);



