const TAG = 'MainRouter ';

const Express = require('express');

const UserRouter = require('./user.route');
const AuthRouter = require('./auth.route');
const HeroRouter = require('./hero.route');

const MainRouter = Express.Router();

MainRouter.post('/heath-check', (req, res) => {
    res.send({message: 'OK'});
});

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/users', UserRouter);
MainRouter.use('/heroes', HeroRouter);

module.exports = MainRouter;
