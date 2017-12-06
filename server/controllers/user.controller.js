const Logger = require('../logger');
const TAG = "UserController ";

const DatabaseUtils = require('../commons/database-utils');
const TextUtils = require('../commons/text-utils');
const HandlerResponse = require('../commons/response/handler-response');

const UserModel = require('../models/user.model');
const BaseController = require('./base.controller')(UserModel);

const UserHandler = require('./handlers/user-handler');

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
  let query = { username: req.body.username };

  if (!DatabaseUtils.isOpen()) {
    HandlerResponse.connectDatabase(res);
  }

  UserModel.findOne(query, (err, user) => {
    if (err) {
      HandlerResponse.error(res, err);
    }
    if (!user) {
      UserHandler.doesNotExist(res);
    } else {
      let password = req.body.password;
      user.comparePassword(password, function(error, isMatch) {
        if (!isMatch) {
          UserHandler.wrongPassword(res);
        } else {
          UserHandler.loginSuccessful(res, user);
        }
      });
    }
  });
}

function register(req, res) {
  Logger.info(TAG + 'Register...');

  let user = new UserModel(req.body);
  if (!DatabaseUtils.isOpen()) {
    HandlerResponse.connectDatabase(res);
  }

  user.save()
    .then(data => { HandlerResponse.success(res, { message: 'User created successfully' }); })
    .catch(err => {
      if (err.code == 11000) {
        UserHandler.userAlreadyExist(res);
      } else {
        HandlerResponse.error(res, err);
      }
    });
}

function update(req, res) {
  Logger.info(TAG + 'Update...');

  delete req.body.username;
  let password;
  TextUtils.hash(req.body.password)
    .then(hash => {
      password = hash;
      let query = { _id: req.params.id };
      let update = { "$set": { "password": password, "role": req.body.role } };
      UserModel.update(query, update, function(err, data) {
        if (err) {
          HandlerResponse.error(res, err);
        } else {
          HandlerResponse.success(res, {message: 'User updated successfully'});
        }
      });
    }).catch(err => HandlerResponse.error(res, err));
}
