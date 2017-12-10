const TAG = 'UserControllerUtils ';

const JWT = require('jsonwebtoken');

const Logger = require('../../logger');
const Config = require('../../config');

const ErrorModel = require('../../commons/response/models/error-response');
const ResponseModel = require('../../commons/response/models/json-response');
const HandlerResponse = require('../../commons/response/handler-response');
const ErrorMessage = require('../../commons/error-message');
const DatabaseUtils = require('../../commons/database-utils');
const TextUtils = require('../../commons/text-utils');
const VerifyRequest = require('../../commons/verify-request');

const UserModel = require('../../models/user.model');

const UserControllerUtils = {};

UserControllerUtils.login = login;
UserControllerUtils.register = register;
UserControllerUtils.update = update;

module.exports = UserControllerUtils;

//Hàm đăng nhập 
function login(req, res) {
    Logger.info(TAG + 'Do Login...');
    
    let query = {username: req.body.username};
    
    if (!DatabaseUtils.isOpen()) {
        HandlerResponse.canNotConnectDatabase(res);
    }
    
    UserModel.findOne(query, (err, user) => {
        if (err) {
            HandlerResponse.error(res, err);
        }
        if (!user) {
            handlerWhenUserDoesNotExist(res);
        } else {
            let password = req.body.password;
            user.comparePassword(password, function(error, isMatch) {
                if (!isMatch) {
                    handlerWhenWrongPassword(res);
                } else {
                    Logger.info(TAG + 'Login Successfully');
                    handlerWhenLoginSuccessful(res, user);
                }
            });
        }
    });
}

//Hàm đăng ký 
function register(req, res) {
    Logger.info(TAG + 'Do Register');
    
    let user = new UserModel(req.body);
    if (!DatabaseUtils.isOpen()) {
        HandlerResponse.canNotConnectDatabase(res);
    }
    
    user.save()
        .then(data => {
            Logger.info(TAG + 'Register successfully');
            HandlerResponse.success(res,
                {message: 'User created successfully'});
        })
        .catch(err => {
            if (err.code === 11000) {
                handlerWhenUserAlreadyExist(res);
            } else {
                HandlerResponse.error(res, err);
            }
        });
}

//Hàm cập nhập user  
function update(req, res) {
    Logger.info(TAG + 'Do update...');
    
    delete req.body.username;
    let password;
    VerifyRequest.verify(req)
                 .then(user => {
                    TextUtils
                        .hash(req.body.password)
                        .then(hash => {
                            password = hash;
                            let query = { _id: req.params.id };
                            let update = {
                                '$set': {
                                    'password': password,
                                    'role': req.body.role
                                }
                            };

                            updateUser(query, update, res);
                        })
                        .catch(err => HandlerResponse.error(res, err));
                 })
                 .catch(error => {
                    if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                    } else {
                         HandlerResponse.error(res, err);
                    }
                 });
}

//Hàm thực hiện việc cập nhật hero trong database 
function updateUser(query, update, res){
     UserModel.update(query, update, function(err, data) {
        if (err) {
            HandlerResponse.error(res, err);
        } else {
            Logger.info(TAG + 'Update user successfully');
            HandlerResponse.success(res, { message: 'User updated successfully' });
        }
     });

}

//Hàm xử lý khi user không tồn tại 
function handlerWhenUserDoesNotExist(res) {
    Logger.info(TAG + 'User does not exists');
    
    let errorModel = buildErrorModel(ErrorMessage.USER_DOES_NOT_EXIST,
        ErrorMessage[ErrorMessage.USER_DOES_NOT_EXIST]);
    
    HandlerResponse.error(res, errorModel);
}

//Hàm xử lý khi đăng nhập thành công 
function handlerWhenLoginSuccessful(res, user) {
    Logger.info(TAG + 'Login successful');
    
    let token = JWT.sign({user: user}, Config.secret_token);
    HandlerResponse.success(res, {token: token});
}

//Hàm xử lý khi sai mật khẩu 
function handlerWhenWrongPassword(res) {
    Logger.info(TAG + 'Wrong password');
    
    let errorModel = buildErrorModel(ErrorMessage.WRONG_PASSWORD,
        ErrorMessage[ErrorMessage.WRONG_PASSWORD]);
    
    let response = new ResponseModel({
        code: 401, status: 'failure', errors: [errorModel],
    });
    
    res.status(401)
       .json(response);
}

//Hàm xử lý khi user đã tồn tại 
function handlerWhenUserAlreadyExist(res) {
    Logger.info(TAG + 'User exists');
    
    let errorModel = buildErrorModel(ErrorMessage.USER_ALREADY_EXIST,
        ErrorMessage[ErrorMessage.USER_ALREADY_EXIST]);
    
    HandlerResponse.error(res, errorModel);
}

function buildErrorModel(code, message) {
    return new ErrorModel({
        code: code, message: message,
    });
}
