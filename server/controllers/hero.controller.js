const TAG = 'HeroController ';

const Logger = require('../logger');

const HeroModel = require('../models/hero.model');

const BaseController = require('./base.controller')(HeroModel);

const HeroControllerUtils = require('./utils/hero-controller-utils');

const HeroController = {};

HeroController.count = BaseController.count;
HeroController.update = BaseController.update;
HeroController.delete = BaseController.delete;
HeroController.getById = BaseController.getById;

HeroController.getHeroes = getHeroes;
HeroController.search = search;
HeroController.create = createNewHero;

module.exports = HeroController;
//Hàm lấy danh sách hero 
function getHeroes(req, res) {
    Logger.info(TAG + 'Get Heroes...');
    
    HeroControllerUtils.getDataByAction(HeroControllerUtils.GET_HERO, req, res);
}
//Hàm lấy danh sách hero theo từ khóa 
function search(req, res) {
    Logger.info(TAG + 'Search Heroes...');
    
    HeroControllerUtils.getDataByAction(HeroControllerUtils.SEARCH, req, res);
}

// Hàm tạo mới hero 
function createNewHero(req, res) {
    Logger.info(TAG + 'Create Heroes...');
    
    HeroControllerUtils.create(req, res);
}
