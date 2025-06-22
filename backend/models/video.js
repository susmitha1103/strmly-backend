const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  title:{
    type: String,
    trim: true,
    required: true
  },
  description:{
    type:String,
    trim: true,
    required:true
  },
  videoUrl:{
    type: String,
    required: true
  },
  uploadedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt:{
    type:Date,
    default :Date.now
  }
})

module.exports = mongoose.model("Video", videoSchema);