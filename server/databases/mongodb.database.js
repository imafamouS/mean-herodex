const TAG = 'DatabaseClient ';

const Mongoose = require('mongoose');

const Logger = require('../logger');
const Config = require('../config');

const MONGODB_URI = `mongodb://${Config.mongo.host}:${Config.mongo.port}/${Config.mongo.database_name}`;

Mongoose.Promise = global.Promise;

module.exports.connect = function() {
	Mongoose.connect(MONGODB_URI, { useMongoClient: true })
		.then(() => {
			Logger.info(
				`${TAG}Connected to MongoDB at ${Config.mongo.port}`);
		})
		.catch((err) => {
			Logger.info(`Cannot connect MongoDB`);
		});
};
