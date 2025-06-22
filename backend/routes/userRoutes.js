const express = require('express');
const router = express.Router();
const { signupUser, userLogin, getProfile } = require('../controllers/userController');
const {verifyToken} = require('../middleware/protect');


router.post('/signup',signupUser);
router.post('/login',userLogin);
router.get('/get',verifyToken,getProfile);

module.exports = router;