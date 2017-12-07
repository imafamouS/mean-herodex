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

HeroController.create = createNewHero;
HeroController.getHeroes = getHeroes;
HeroController.search = search;

module.exports = HeroController;

function getHeroes(req, res) {
    Logger.info(TAG + 'Get Heroes...');
    
    HeroControllerUtils.getDataByAction(HeroControllerUtils.GET_HERO, req, res);
}

function search(req, res) {
    Logger.info(TAG + 'Search Heroes...');
    
    HeroControllerUtils.getDataByAction(HeroControllerUtils.SEARCH, req, res);
}

function createNewHero(req, res) {
    Logger.info(TAG + 'Search Heroes...');
    
    HeroControllerUtils.createHero(req, res);
}
