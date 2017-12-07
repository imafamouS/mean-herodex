const TAG = 'BaseController ';

const Logger = require('../logger');

const BaseControllerUtils = require('./utils/base-controller-utils');

module.exports = (model) => new BaseController(model);

function BaseController(model) {
    this.model = model;
    
    this.getAll = (req, res) => {
        Logger.info(TAG + 'Get All');
        BaseControllerUtils.getAll(this.model, req, res);
    };
    
    this.getById = (req, res) => {
        Logger.info(TAG + 'Get By Id');
        BaseControllerUtils.getById(this.model, req, res);
    };
    this.count = (req, res) => {
        Logger.info(TAG + 'Count');
        BaseControllerUtils.count(this.model, req, res);
    };
    
    this.create = (req, res) => {
        Logger.info('Create');
        BaseControllerUtils.create(this.model, req, res);
    };
    this.update = (req, res) => {
        Logger.info(TAG + 'Update');
        BaseControllerUtils.update(this.model, req, res);
    };
    this.delete = (req, res) => {
        Logger.info(TAG + 'Delete');
        BaseControllerUtils.delete(this.model, req, res);
    };
}
