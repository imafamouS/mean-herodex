const TAG = 'TextUtils ';

const Bcrypt = require('bcryptjs');

const Logger = require('../logger');

const TextUtils = {};

TextUtils.isEmpty = isEmpty;
TextUtils.hash = hash;

module.exports = TextUtils;

function isEmpty( str ) {
        if (str == null || str.length === 0 || str == undefined) {
                return true;
        } else {
                return false;
        }
}

function hash( str ) {
        Logger.info(TAG + 'hash');
        return new Promise((resolve, reject) => {
                Bcrypt.genSalt(10, (err, salt) => {
                        if( err ) {
                                reject(err);
                        }
                        Bcrypt.hash(str, salt, (error, hash) => {
                        if( error ) {
                                reject(error);
                        }
                        resolve( hash );
                        });
                });
        });
}


