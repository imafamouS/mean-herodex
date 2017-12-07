const TAG = 'UserRouter ';

const Express = require('express');

const UserController = require('../controllers/user.controller');

const UserRouter = Express.Router();

UserRouter.route('/')
	.get(UserController.count);

UserRouter.route('/:id')
	.get(UserController.getById)
	.put(UserController.update)
	.delete(UserController.delete);

module.exports = UserRouter;
