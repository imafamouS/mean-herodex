const TAG = 'HeroRouter ';

const Express = require('express');

const HeroController = require('../controllers/hero.controller');

const HeroRouter = Express.Router();

HeroRouter.route('/search')
          .get(HeroController.search);

HeroRouter.route('/')
          .get(HeroController.getHeroes)
          .post(HeroController.create);

HeroRouter.route('/:id')
          .get(HeroController.getById)
          .put(HeroController.update)
          .delete(HeroController.delete);

module.exports = HeroRouter;
