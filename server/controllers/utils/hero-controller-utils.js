const TAG = 'HeroControllerUtils ';
const GET_HERO = 'GET_HERO';
const SEARCH = 'SEARCH';

const Logger = require('../../logger');

const VerifyRequest = require('../../commons/verify-request');
const DatabaseUtils = require('../../commons/database-utils');
const HandlerResponse = require('../../commons/response/handler-response');

const HeroModel = require('../../models/hero.model');

const HeroControllerUtils = {};

HeroControllerUtils.GET_HERO = GET_HERO;
HeroControllerUtils.SEARCH = SEARCH;
HeroControllerUtils.getDataByAction = getDataByAction;
HeroControllerUtils.create = createHero;

module.exports = HeroControllerUtils;

//Hàm lấy danh sách hero theo action gồm
//GET_HERO và SEARCH
function getDataByAction(action, req, res) {
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
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

//Hàm thêm mới Hero
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
                     if (err.name === 'JsonWebTokenError') {
                         HandlerResponse.unauthorized(res);
                     } else {
                         HandlerResponse.error(res, err);
                     }
                 });
}

//Hàm kiểm tra xem request có phải là request lấy danh sách hero theo phân đoạn 
function shouldGetHeroByOffet(req) {
    return req.query.offset && req.query.limit;
}

//Hàm tạo query truy vấn theo action 
function queryBuilder(action, req, user) {
    let query;
    switch (action) {
        case GET_HERO:
            query = buildQueryForGetHero(user);
            break;
        case SEARCH:
            query = buildQueryForSearchHero(req, user);
            break;
        default:
            query = buildQueryForGetHero(user);
            break;
    }
    return query;
}

//Hàm tạo query truy vấn cho việc GET_HERO 
function buildQueryForGetHero(user) {
    return {user_id: user._id};
}

//Hàm tạo query truy vấn cho việc SEARCH
function buildQueryForSearchHero(req, user) {
    let query;
    
    let name = req.query.name || '';
    
    if (name.length > 0) {
        query = {
            user_id: user._id, name: new RegExp(name, 'i'),
        };
    } else {
        query = {user_id: user._id};
    }
    
    return query;
}

//Hàm lấy danh sách hero theo query 
function getHeroWithQuery(req, res, query) {

    if (shouldGetHeroByOffet(req)) {
        getHeroByOffset(req, res, query);
    } else {
        getAllHero(req, res, query);
    }
}

//Hàm lấy danh sách hero theo phân đoạn 
function getHeroByOffset(req, res, query) {
    Logger.info('Get Heroes BY OFFSET');
    
    let pageOption = {
        offset: Number(req.query.offset - 1) <= 0
            ? 0
            : Number(req.query.offset - 1),
        limit: Number(req.query.limit) <= 0 ? 1 : Number(req.query.limit),
    };
    
    Logger.info('PageOption ' + JSON.stringify(pageOption));
    
    HeroModel.find(query)
             .sort({date_created: -1})
             .skip(pageOption.offset)
             .limit(pageOption.limit)
             .exec((err, heroes) => {
                 if (err) {
                     HandlerResponse.error(res, err);
                 }
                 HeroModel.count(query)
                          .then((count) => {
                              HandlerResponse.success(res,
                                  {count: count, heroes: heroes});
                          })
                          .catch((err) => {
                              HandlerResponse.error(res, err);
                          });
             });
}

//Hàm lấy danh sách hero
function getAllHero(req, res, query) {
    Logger.info('Get all Heroes');
    console.log(query);
    HeroModel.find(query)
             .sort({date_created: -1})
             .then((heroes) => {
                 HandlerResponse.success(res,
                     {count: heroes.length, heroes: heroes});
             })
             .catch((err) => {
                 HandlerResponse.error(res, err);
             });
}

