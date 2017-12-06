const Logger = require('../../logger');
const TAG = 'HandlerResponse ';
const ResponseModel = require('./models/json-response');
const ErrorModel = require('./models/error-response');
const ErrorMessage = require('../error-message');
const HttpStatus = require('../http-status');

const HandlerResponse = {};

HandlerResponse.success = handlerSuccess;
HandlerResponse.error = handlerError;
HandlerResponse.unauthorized = handlerUnauthorized;
HandlerResponse.connectDatabase = handlerCannotConnectionDatabase;

module.exports = HandlerResponse;

function handlerSuccess(res, data) {
	Logger.info(TAG + 'Handler Success');
	let response = new ResponseModel({
		code: 200,
		status: 'success',
		message: 'OK',
		data: data
	});

	res.status(200).json(response);
}

function handlerError(res, err) {
	Logger.info(TAG + 'Handler Error');

	if (err.name == 'ValidationError' || err.name == 'CastError') {
		Logger.info(TAG + err.name);

		let errorList = [];
		if (err.name == 'ValidationError') {
			for (let field in err.errors) {
				let message = `{"${field}": "${err.errors[field].message}"}`;

				let errorModel = JSON.parse(message);
				errorList.push(errorModel);
			}
		} else if (err.name == 'CastError') {
			let errorModel = new ErrorModel({
				code: ErrorMessage.CANNOT_CAST_OBJECTID,
				message: ErrorMessage[ErrorMessage.CANNOT_CAST_OBJECTID]
			});
			errorList.push(errorModel);
		}

		let response = new ResponseModel({
			code: 404,
			status: 'failure',
			message: ErrorMessage[ErrorMessage.AN_ERROR_HAS_OCCURRED],
			errors: errorList
		});

		res.status(404).json(response);
	} else {
		let response = new ResponseModel({
			code: 404,
			status: 'failure',
			message: ErrorMessage[ErrorMessage.AN_ERROR_HAS_OCCURRED],
			errors: [err]
		});

		res.status(404).json(response);
	}
}

function handlerUnauthorized(res) {
	Logger.info(TAG + 'Handler Auth');

	let response = new ResponseModel({
		code: 401,
		status: 'failure',
		errors: [new ErrorModel({
			code: ErrorMessage.INVALID_ACCESS_TOKEN,
			message: ErrorMessage[ErrorMessage.INVALID_ACCESS_TOKEN]
		})]
	});

	res.status(401).json(response);
}

function handlerCannotConnectionDatabase(res) {
	Logger.info(TAG + 'Handler Connection database');

	let response = new ResponseModel({
		code: 504,
		status: 'failure',
		message: HttpStatus[504],
		errors: [new ErrorModel({
			code: ErrorMessage.CANNOT_CONNECT_TO_DATABASE,
			message: ErrorMessage[ErrorMessage.CANNOT_CONNECT_TO_DATABASE]
		})]
	});
	res.status(504).json(response);
}
