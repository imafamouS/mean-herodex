const TAG = 'TextUtils ';

const Bcrypt = require('bcryptjs');

const Logger = require('../logger');

const TextUtils = {};

TextUtils.isEmpty = isEmpty;
TextUtils.hash = hash;

module.exports = TextUtils;

//Hàm kiểm tra chuỗi có rổng hay không 
function isEmpty(str) {
    return str === null || str.length === 0 || str === undefined;
}

//Hàm hash chuỗi 
function hash(str) {
    Logger.info(TAG + 'hash');
    return new Promise((resolve, reject) => {
        Bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            Bcrypt.hash(str, salt, (error, hash) => {
                if (error) {
                    reject(error);
                }
                resolve(hash);
            });
        });
    });
}


