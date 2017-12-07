const TAG = "HeroControllerUtils ";

const Logger = require('../../logger');
const Config = require('../../config');

const VerifyRequest = require('../../commons/verify-request');
const DatabaseUtils = require('../../commons/database-utils');

const HeroModel = require('../../models/hero.model');

const HeroControllerUtils = {};

HeroControllerUtils.GET_HERO = 'GET_HERO';
HeroControllerUtils.SEARCH = 'SEARCH';
HeroControllerUtils.getDataByAction = getDataByAction;
HeroControllerUtils.createHero = createHero;

module.exports = HeroControllerUtils;

function getDataByAction(action) {
        Logger.info(TAG + action);

        if (!DatabaseUtils.isOpen()) {
                HandlerResponse.canNotConnectDatabase(res);
        }

        VerifyRequest.verify(req)
                .then((data) => {
                        let query = queryBuilder(action, req, data.user);

                        getHeroWithQuery(req, res, query);
                })
                .catch((err) => {
                        HandlerResponse.unauthorized(res);
                });
}

function createHero(req, res) {
        Logger.info(TAG + 'Create_hero');

        if (!DatabaseUtils.isOpen()) {
                HandlerResponse.canNotConnectDatabase(res);
        }

        VerifyRequest.verify(req)
                .then(data => {
                        let hero = req.body;
                        hero.user_id = data.user._id;
                        let obj = new HeroModel(hero);

                        obj.save()
                                .then(data => {
                                        HandlerResponse.success(res, data);
                                })
                                .catch(err => {
                                        HandlerResponse.error(res, err);
                                });
                })
                .catch(err => {
                        HandlerResponse.unauthorized(res);
                });
}

function shouldGetHeroByOffet(req) {
        return req.query.offset && req.query.limit;
}

function queryBuilder(action, req, user) {
        let query;
        switch (action) {
                case 'GET_HERO':
                        query = buildQueryForGetHero(user);
                        break;
                case 'SERACH':
                        query = buildQueryForSearchHero(req, user);
                        break;
                default:
                        query = buildQueryForGetHero(user);
                        break;
        }
        return query;
}

function buildQueryForGetHero(user) {
        return { user_id: user.user._id };
}

function buildQueryForSearchHero(req, user) {
        let query;

        let name = req.query.name || '';

        if (name.length > 0) {
                query = {
                        user_id: user.user._id,
                        name: { $regex: '.*' + name + '.*' }
                };
        } else {
                query = { user_id: user.user._id };
        }

        return query;
}

function getHeroWithQuery(req, res, query) {
        if (shouldGetHeroByOffet(req)) {
                getHeroByOffet(req, res, query);
        } else {
                getAllHero(req, res, query);
        }
}

function getHeroByOffet(req, res, query) {
        Logger.info("Get Heroes BY OFFSET");

        let pageOption = {
                offset: Number(req.query.offset - 1) <= 0 ? 0 : Number(req.query.offset - 1),
                limit: Number(req.query.limit) <= 0 ? 1 : Number(
                        req.query.limit)
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

        HeroModel.find(query).sort({ date_created: -1 })
                .then((heroes) => {
                        HandlerResponse.success(res, { count: heroes.length, heroes: heroes });
                })
                .catch((err) => {
                        HandlerResponse.error(res, err);
                });
}
