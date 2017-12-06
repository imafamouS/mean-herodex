const Logger = require('../logger');
const TAG = "BaseController ";

const VerifyRequest = require('../commons/verify-request');
const HandlerResponse = require('../commons/response/handler-response');
const DatabaseUtils = require('../commons/database-utils');

module.exports = (model) => new BaseController(model);

function BaseController(model) {
  this.model = model;

  this.getAll = (req, res) => {
    Logger.info(TAG + 'Get All');

    if (!DatabaseUtils.isOpen()) {
      HandlerResponse.connectDatabase(res);
    }

    VerifyRequest.verify(req)
      .then(user => {
        this.model.find({})
          .then(data => { HandlerResponse.success(res, data); })
          .catch(err => { HandlerResponse.error(res, err); });
      })
      .catch(err => { HandlerResponse.unauthorized(res); });
  };

  this.getById = (req, res) => {
    Logger.info(TAG + 'Get By Id');

    if (!DatabaseUtils.isOpen()) {
      HandlerResponse.connectDatabase(res);
    }

    VerifyRequest.verify(req)
      .then(user => {
        let query = { _id: req.params.id };
        this.model.findOne(query)
          .then(data => { HandlerResponse.success(res, data); })
          .catch(err => { HandlerResponse.error(res, err); });
      })
      .catch(err => { HandlerResponse.unauthorized(res); });
  };
  this.count = (req, res) => {
    Logger.info(TAG + 'Count');

    if (!DatabaseUtils.isOpen()) {
      HandlerResponse.connectDatabase(res);
    }

    this.model.count()
      .then(data => { HandlerResponse.success(res, { count: data }); })
      .catch(err => { HandlerResponse.error(res, err); });
  };

  this.create = (req, res) => {
    Logger.info("Create");

    if (!DatabaseUtils.isOpen()) {
      HandlerResponse.connectDatabase(res);
    }

    VerifyRequest.verify(req)
      .then(user => {
        let obj = new this.model(req.body);
        obj.save()
          .then(data => { HandlerResponse.success(res, data); })
          .catch(err => { HandlerResponse.error(res, err); });
      })
      .catch(err => { HandlerResponse.unauthorized(res); });
  };
  this.update = (req, res) => {
    Logger.info(TAG + 'Update');

    if (!DatabaseUtils.isOpen()) {
      HandlerResponse.connectDatabase(res);
    }

    VerifyRequest.verify(req)
      .then(user => {
        let query = { _id: req.params.id };
        this.model.findOneAndUpdate(query, req.body, { 'upsert': true, runValidators: true }).exec()
          .then(data => { HandlerResponse.success(res, data); })
          .catch(err => { HandlerResponse.error(res, err); });
      })
      .catch(err => { HandlerResponse.unauthorized(res); });
  };
  this.delete = (req, res) => {
    Logger.info(TAG + 'Delete');

    if (!DatabaseUtils.isOpen()) {
      HandlerResponse.connectDatabase(res);
    }

    VerifyRequest.verify(req)
      .then(user => {
        let query = { _id: req.params.id };

        this.model.findOneAndRemove(query)
          .then(data => { HandlerResponse.success(res, data); })
          .catch(err => { HandlerResponse.error(res, err); });
      })
      .catch(err => { HandlerResponse.unauthorized(res); });
  };
}
