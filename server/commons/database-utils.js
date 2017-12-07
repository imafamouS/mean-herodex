const TAG = 'DatabaseUtils ';

const Mongoose = require('mongoose');

const Logger = require('../logger');
const Config = require('../config');

const DatabaseUtils = {};

DatabaseUtils.isOpen = isOpen;
DatabaseUtils.checkIfConnectionIsOpen = isConnectionOpen;

module.exports = DatabaseUtils;

function isOpen() {
    return isConnectionOpen(Config.database_client);
}

function isConnectionOpen(client) {
    Logger.info(TAG + '[' + client + '] Check if conneciton is open');
    let _client = client || 'mongodb';
    if (client === 'mongodb') {
        return Mongoose.connection._hasOpened;
    }
    return false;
}
