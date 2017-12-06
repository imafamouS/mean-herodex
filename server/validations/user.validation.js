const BlackListUserName = require('../commons/blacklist-username');

const usernameRegex = /^[a-zA-Z0-9\d$@$!%*?&;]/;
const passwordRegex = /^[A-Za-z0-9\d$@$!%*?&;]/;

function usernameValidate(username) {
    if (BlackListUserName.validate(username)) {
        return false;
    }
    
    return usernameRegex.test(username);
}

function passwordValidate(password) {
    return passwordRegex.test(password);
}

function roleValidate(role) {
    if (role !== 'admin' && role !== 'user') {
        return false;
    }

    return true;
}
const UserValidation = {};

UserValidation.username = usernameValidate;
UserValidation.password = passwordValidate;
UserValidation.role = roleValidate;

module.exports = UserValidation;
