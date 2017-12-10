const TAG = 'UserController ';

const Logger = require('../logger');

const UserModel = require('../models/user.model');

const BaseController = require('./base.controller')(UserModel);

const UserControllerUtils = require('./utils/user-controller-utils');

const UserController = {};

UserController.count = BaseController.count;
UserController.getById = BaseController.getById;
UserController.delete = BaseController.delete;

UserController.login = login;
UserController.register = register;
UserController.update = update;

module.exports = UserController;

//Hàm đăng nhập 
function login(req, res) {
    Logger.info(TAG + 'Login...');
    
    UserControllerUtils.login(req, res);
}

//Hàm đăng ký 
function register(req, res) {
    Logger.info(TAG + 'Register...');
    
    UserControllerUtils.register(req, res);
}

//Hàm cập nhật user 
function update(req, res) {
    Logger.info(TAG + 'Update...');
    
    UserControllerUtils.update(req, res);
}
