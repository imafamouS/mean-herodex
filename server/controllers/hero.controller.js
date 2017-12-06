const Logger = require('../logger');
const TAG = "HeroController ";

const HeroModel = require('../models/hero.model');
const BaseController = require('./base.controller')(HeroModel);
const VerifyRequest = require('../commons/verify-request');
const DatabaseUtils = require('../commons/database-utils');

const HandlerResponse = require('../commons/response/handler-response');

const HeroController = {};

HeroController.count = BaseController.count;
HeroController.create = createNewHero;
HeroController.update = BaseController.update;
HeroController.delete = BaseController.delete;
HeroController.getById = BaseController.getById;
HeroController.getHeroes = getHeroes;
HeroController.search = search;
module.exports = HeroController;



function getHeroes(req, res) {
  Logger.info("Get Heroes");
  if (!DatabaseUtils.isOpen()) {
    HandlerResponse.connectDatabase(res);
  }
  VerifyRequest.verify(req)
    .then((data) => {
      let query = { user_id: data.user._id };
      if (shouldGetHeroByOffet(req)) {
        getHeroByOffet(req, res, query);
      } else {
        getAllHero(req, res, query);
      }
    })
    .catch((err) => {
      HandlerResponse.unauthorized(res);
    });
}

function createNewHero(req, res) {
  if (!DatabaseUtils.isOpen()) {
    HandlerResponse.connectDatabase(res);
  }

  VerifyRequest.verify(req)
    .then(data => {
      let hero = req.body;
      hero.user_id = data.user._id;
      let obj = new HeroModel(hero);
      obj.save()
        .then(data => { HandlerResponse.success(res, data); })
        .catch(err => { HandlerResponse.error(res, err); });
    })
    .catch(err => { HandlerResponse.unauthorized(res); });
}

function search(req, res) {
  Logger.info("Search Heroes");
  if (!DatabaseUtils.isOpen()) {
    HandlerResponse.connectDatabase(res);
  }
  VerifyRequest.verify(req)
    .then((data) => {
      let name = req.query.name || '';
      let query = { user_id: data.user._id, name: new RegExp('^'+name+'$', 'i')};
      if (shouldGetHeroByOffet(req)) {
        getHeroByOffet(req, res, query);
      } else {
        getAllHero(req, res);
      }
    })
    .catch((err) => {
      HandlerResponse.unauthorized(res);
    });
}

function shouldGetHeroByOffet(req) {
  return req.query.offset && req.query.limit;
}

function getHeroByOffet(req, res, query) {
  Logger.info("Get Heroes BY OFFSET");

  let pageOption = {
    offset: Number(req.query.offset - 1) <= 0 ? 0 : Number(req.query.offset - 1),
    limit: Number(req.query.limit) <= 0 ? 1 : Number(req.query.limit)
  };
  Logger.info("PageOption " + JSON.stringify(pageOption));
  HeroModel.find(query)
    .sort({ date_created: -1 })
    .skip(pageOption.offset)
    .limit(pageOption.limit)
    .exec((err, heroes) => {
      if (err) {
        HandlerResponse.error(res, err);
      }
      HeroModel.count(query)
        .then((count) => {
          HandlerResponse.success(res, { count: count, heroes: heroes });
        })
        .catch((err) => {
          HandlerResponse.error(res, err);
        });
    });
}

function getAllHero(req, res, query) {
  Logger.info("Get all Heroes");

  HeroModel.find({}).sort({ date_created: -1 })
    .then((heroes) => {
      HandlerResponse.success(res, { count: heroes.length, heroes: heroes });
    })
    .catch((err) => {
      HandlerResponse.error(res, err);
    });
}
