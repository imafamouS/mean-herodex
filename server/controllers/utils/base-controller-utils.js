const TAG = 'BaseControllerUtils ';

const VerifyRequest = require('../../commons/verify-request');
const HandlerResponse = require('../../commons/response/handler-response');
const DatabaseUtils = require('../../commons/database-utils');

const BaseControllerUtils = {};

BaseControllerUtils.getAll = getAll;
BaseControllerUtils.getById = getById;
BaseControllerUtils.count = count;
BaseControllerUtils.create = create;
BaseControllerUtils.update = update;
BaseControllerUtils.delete = _delete;

module.exports = BaseControllerUtils;

function getAll(model, req, res) {
    handlerWhenCannotConnectDatabase(res);
    
    VerifyRequest.verify(req)
                 .then(user => {
                     model.find({})
                          .then(data => {
                              HandlerResponse.success(res, data);
                          })
                          .catch(err => {
                              HandlerResponse.error(res, err);
                          });
                 })
                 .catch(err => {
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

function getById(model, req, res) {
    
    handlerWhenCannotConnectDatabase(res);
    
    VerifyRequest.verify(req)
                 .then(user => {
                     let query = {_id: req.params.id};
                     model.findOne(query)
                          .then(data => {
                              HandlerResponse.success(res, data);
                          })
                          .catch(err => {
                              HandlerResponse.error(res, err);
                          });
                 })
                 .catch(err => {
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

function count(model, req, res) {
    
    handlerWhenCannotConnectDatabase(res);
    
    model.count()
         .then(data => {
             HandlerResponse.success(res, {count: data});
         })
         .catch(err => {
             if (err.name === 'JsonWebTokenError') {
                 HandlerResponse.unauthorized(res);
             } else {
                 HandlerResponse.error(res, err);
             }
         });
}

function create(model, req, res) {
    
    handlerWhenCannotConnectDatabase(res);
    
    VerifyRequest.verify(req)
                 .then(user => {
                     let obj = new model(req.body);
                     obj.save()
                        .then(data => {
                            HandlerResponse.success(res, data);
                        })
                        .catch(err => {
                            HandlerResponse.error(res, err);
                        });
                 })
                 .catch(err => {
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

function update(model, req, res) {
    
    handlerWhenCannotConnectDatabase(res);
    
    VerifyRequest.verify(req)
                 .then(user => {
                     let query = {_id: req.params.id};
                     model.findOneAndUpdate(query, req.body,
                         {'upsert': true, runValidators: true})
                          .exec()
                          .then(data => {
                              HandlerResponse.success(res, data);
                          })
                          .catch(err => {
                              HandlerResponse.error(res, err);
                          });
                 })
                 .catch(err => {
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

function _delete(model, req, res) {
    
    handlerWhenCannotConnectDatabase(res);
    
    VerifyRequest.verify(req)
                 .then(user => {
                     let query = {_id: req.params.id};
        
                     model.findOneAndRemove(query)
                          .then(data => {
                              HandlerResponse.success(res, data);
                          })
                          .catch(err => {
                              HandlerResponse.error(res, err);
                          });
                 })
                 .catch(err => {
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

function handlerWhenCannotConnectDatabase(res) {
    if (!DatabaseUtils.isOpen()) {
        HandlerResponse.canNotConnectDatabase(res);
    }
}
