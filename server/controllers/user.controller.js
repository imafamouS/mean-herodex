const TAG = 'UserController ';

const Logger = require('../logger');

const UserModel = require('../models/user.model');

const BaseController = require('./base.controller')(UserModel);

const UserControllerUtils = require('./utils/user-controller-utils');

const UserController = {};

UserController.login = login;
UserController.register = register;
UserController.update = update;

UserController.count = BaseController.count;
UserController.getById = BaseController.getById;
UserController.delete = BaseController.delete;

module.exports = UserController;

function login(req, res) {
    Logger.info(TAG + 'Login...');
    
    UserControllerUtils.login(req, res);
}

function register(req, res) {
    Logger.info(TAG + 'Register...');
    
    UserControllerUtils.register(req, res);
}

function update(req, res) {
    Logger.info(TAG + 'Update...');
    
    UserControllerUtils.update(req, res);
}
