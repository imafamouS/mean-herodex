const TAG = 'HandlerResponse ';

const Logger = require('../../logger');

const ResponseModel = require('./models/json-response');
const ErrorModel = require('./models/error-response');

const ErrorMessage = require('../error-message');
const HttpStatus = require('../http-status');

const HandlerResponse = {};

HandlerResponse.success = handlerSuccess;
HandlerResponse.error = handlerError;
HandlerResponse.unauthorized = handlerUnauthorized;
HandlerResponse.canNotConnectDatabase = handlerCannotConnectionDatabase;

module.exports = HandlerResponse;

function handlerSuccess(res, data) {
    Logger.info(TAG + 'Handler Success');
    let response = new ResponseModel({
        code: 200, status: 'success', message: 'OK', data: data,
    });
    
    res.status(200)
       .json(response);
}

function handlerError(res, err) {
    Logger.info(TAG + 'Handler Error:' + err.name);
    let errorList = [];
    
    switch (err.name) {
        case 'ValidationError':
            errorList = buildErrorListFromValidationError(err);
            break;
        case 'CastError':
            errorList = buildErrorListFromCastError(err);
            break;
        case 'TypeError':
            errorList = buildErrorListFromTypeError(err);
            break;
        default:
            erorrList = [err];
            break;
    }
    let response = new ResponseModel({
        code: 404,
        status: 'failure',
        message: ErrorMessage[ErrorMessage.AN_ERROR_HAS_OCCURRED],
        errors: errorList,
    });
    
    res.status(404)
       .json(response);
}

function buildErrorListFromValidationError(err) {
    let errorList = [];
    
    for (let field in err.errors) {
        let message = `{"${field}": "${err.errors[field].message}"}`;
        
        let errorModel = JSON.parse(message);
        errorList.push(errorModel);
    }
    
    return errorList;
}

function buildErrorListFromCastError(err) {
    let errorList = [];
    
    let errorModel = new ErrorModel({
        code: ErrorMessage.CANNOT_CAST_OBJECTID,
        message: ErrorMessage[ErrorMessage.CANNOT_CAST_OBJECTID],
    });
    errorList.push(errorModel);
    
    return errorList;
    
}

function buildErrorListFromTypeError() {
    let errorList = [];
    let errorModel = new ErrorModel({
        code: ErrorMessage.TYPE_ERROR_HAS_OCCURRED,
        message: ErrorMessage[ErrorMessage.TYPE_ERROR_HAS_OCCURRED],
    });
    errorList.push(errorModel);
    
    return errorList;
}

function handlerUnauthorized(res) {
    Logger.info(TAG + 'Handler Auth');
    
    let response = new ResponseModel({
        code: 401, status: 'failure', errors: [
            new ErrorModel({
                code: ErrorMessage.INVALID_ACCESS_TOKEN,
                message: ErrorMessage[ErrorMessage.INVALID_ACCESS_TOKEN],
            })],
    });
    
    res.status(401)
       .json(response);
}

function handlerCannotConnectionDatabase(res) {
    Logger.info(TAG + 'Handler Connection database');
    
    let response = new ResponseModel({
        code: 504, status: 'failure', message: HttpStatus[504], errors: [
            new ErrorModel({
                code: ErrorMessage.CANNOT_CONNECT_TO_DATABASE,
                message: ErrorMessage[ErrorMessage.CANNOT_CONNECT_TO_DATABASE],
            })],
    });
    res.status(504)
       .json(response);
}
