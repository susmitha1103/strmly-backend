const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); 
const { uploadVideo } = require('../controllers/videoController');
const { verifyToken } = require('../middleware/protect');

router.post('/upload', verifyToken, upload.single('video'), uploadVideo);

module.exports = router;