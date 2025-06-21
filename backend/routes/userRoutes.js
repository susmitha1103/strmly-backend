const signupUser = require('../controllers/userController');
const Router = require('router');

Router.post('/signup',signupUser);

module.exports = userRoutes;