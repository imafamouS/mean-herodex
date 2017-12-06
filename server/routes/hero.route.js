const Express = require('express');

const HeroController = require('../controllers/hero.controller');
const Router = Express.Router();

Router.route('/search')
	.get(HeroController.search);

Router.route('/')
	.get(HeroController.getHeroes)
	.post(HeroController.create);

Router.route('/:id')
	.get(HeroController.getById)
	.put(HeroController.update)
	.delete(HeroController.delete);

module.exports = Router;
