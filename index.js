const Logger = require('./server/logger');
const App = require('./server/app');
const MongoDbClient = require('./server/databases/mongodb.database');

App.listen(App.get('port'), () => {
	MongoDbClient.connect();
	Logger.info(`Application listening at port 8000`);
});
