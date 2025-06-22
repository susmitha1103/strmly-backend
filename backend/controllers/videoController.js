const Video = require('../models/video');
const {cloudinary} = require('../config/cloudinary');

const uploadVideo = async(req,res) =>{
  const {title, description} = req.body;
  const file = req.file

  if(!title || !description){
    return res.status(400).json({message: "fields, title, description are required"});
  }

  if(!file){
    return res.status(400).json({message: "file missing"});
  }
  
  try{
   cloudinary.uploader.upload_stream(
    
      {resource_type: "video",folder: 'strmly'},
      async(error,result) =>{
        if(error){
          console.error("cloudinary error: ",error.message);
           return res.status(500).json({message: "upload failed"});
        }
         const newVideo = new Video({
         title,
         description,
         videoUrl: result.secure_url,
         uploadedBy: req.user.id
        });
        await newVideo.save();
        return res.status(200).json({message: "new video uploaded", url:result.secure_url});
      },
      
    ).end(file.buffer);
  }
  catch(error){
    console.error("error uploading video",error.message);
    res.status(500).json({message: "Internal server error"});

  }
};

const getAllVideos = async(req,res) =>{
  try{
    const videos = await Video.find()
      .select('title videoUrl createdAt uploadedBy')
      .populate('uploadedBy', 'username _id')
      .sort({ createdAt: -1 });

      return res.status(200).json({ message: "Fetched all videos", videos });
  }
  catch(error){
    console.error("error fetching videos",error.message);
    return res.status(500).json({message:"internal server error"});
  }

}
module.exports = {uploadVideo,getAllVideos};