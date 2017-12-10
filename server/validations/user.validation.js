const TAG = 'UserValidation ';

const BlackListUserName = require('../commons/blacklist-username');

const usernameRegex = /^[a-zA-Z0-9\d$@$!%*?&;]/;
const passwordRegex = /^[A-Za-z0-9\d$@$!%*?&;]/;

const UserValidation = {};

UserValidation.username = usernameValidate;
UserValidation.password = passwordValidate;
UserValidation.role = roleValidate;

module.exports = UserValidation;

//Hàm kiểm tra username có hợp lệ 
function usernameValidate(username) {
    if (BlackListUserName.validate(username)) {
        return false;
    }
    
    return usernameRegex.test(username);
}

//Hàm kiểm tra password có hợp lệ
function passwordValidate(password) {
    return passwordRegex.test(password);
}

//Hàm kiểm tra role user có hợp lệ
function roleValidate(role) {
    return !(role !== 'admin' && role !== 'user');
}
