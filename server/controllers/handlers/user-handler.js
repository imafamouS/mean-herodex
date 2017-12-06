const JWT = require('jsonwebtoken');

const Logger = require('../../logger');
const Config = require('../../config');

const TAG = "UserHandler ";

const ErrorModel = require('../../commons/response/models/error-response');
const ResponseModel = require('../../commons/response/models/json-response');
const HandlerResponse = require('../../commons/response/handler-response');
const ErrorMessage = require('../../commons/error-message');

const UserHandler = {};
UserHandler.doesNotExist = handlerWhenUserDoesNotExist;
UserHandler.loginSuccessful = handlerWhenLoginSuccessful;
UserHandler.wrongPassword = handlerWhenWrongPassword;
UserHandler.userAlreadyExist = handlerWhenUserAlreadyExist;

module.exports = UserHandler;

function handlerWhenUserDoesNotExist(res) {
  Logger.info(TAG + 'User does not exists');
  let errorModel = buildErrorModel(ErrorMessage.USER_DOES_NOT_EXIST,
    ErrorMessage[ErrorMessage.USER_DOES_NOT_EXIST]);

  HandlerResponse.error(res, errorModel);
}

function handlerWhenLoginSuccessful(res, user) {
  Logger.info(TAG + 'Login successful');

  let token = JWT.sign({ user: user }, Config.secret_token);
  HandlerResponse.success(res, { token: token });
}

function handlerWhenWrongPassword(res) {
  Logger.info(TAG + 'Wrong password');

  let errorModel = buildErrorModel(ErrorMessage.WRONG_PASSWORD,
    ErrorMessage[ErrorMessage.WRONG_PASSWORD]);

  let response = new ResponseModel({
    code: 401,
    status: 'failure',
    errors: [errorModel]
  });

  res.status(401).json(response);
}

function handlerWhenUserAlreadyExist(res) {
  Logger.info(TAG + 'User exists');

  let errorModel = buildErrorModel(ErrorMessage.USER_ALREADY_EXIST,
    ErrorMessage[ErrorMessage.USER_ALREADY_EXIST]);

  HandlerResponse.error(res, errorModel);
}


function buildErrorModel(code, message) {
  return new ErrorModel({
    code: code,
    message: message
  });
}
