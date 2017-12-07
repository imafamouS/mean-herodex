const TAG = 'AuthRouter ';

const Express = require('express');

const UserController = require('../controllers/user.controller');

const AuthRouter = Express.Router();

AuthRouter.route('/login')
	.post(UserController.login);

AuthRouter.route('/register')
	.post(UserController.register);

module.exports = AuthRouter;
