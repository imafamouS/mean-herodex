const TAG = 'App ';

const Express = require('express');
const BodyParse = require('body-parser');
const CookieParser = require('cookie-parser');
const Logger = require('morgan');
const Path = require('path');

const Config = require('./config');
const Router = require('./routes/main.route');

const App = Express();
App.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers',
		'X-Requested-With, Content-Type, charset, token');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

App.use(BodyParse.json());
App.use(BodyParse.urlencoded({ extended: false }));
App.use(CookieParser());

if (Config.env === 'development') {
	App.use(Logger("dev"));
}

if (Config.env === 'production') {
	App.use('/', Express.static(Path.join(__dirname, '../dist/public')));
	App.get('/*', function(req, res) {
		res.sendFile(Path.join(__dirname, '../dist/public/index.html'));
	});
}

App.use('/api', Router);

App.set('port', Config.port);

module.exports = App;
