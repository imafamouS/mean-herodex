const JWT = require('jsonwebtoken');
const Config = require('../config');

const VerifyRequest = {};
VerifyRequest.verify = verify;
VerifyRequest.verifyWithToken = verifyWithToken;

module.exports = VerifyRequest;

function verify(req) {
  return verifyWithToken(req);
}

function verifyWithToken(req) {
  return new Promise((resolve, reject) => {
    let token = req.headers.token || req.query.token;
    JWT.verify(token, Config.secret_token, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}