/*
 * 1xx: Authorite message,
 * 2xx: Hero message
 * 9xx: Server message
 */

const ErrorMessage = {
    100: 'Oops! Username is required',
    101: 'Oops! Password is required',
    102: 'Oops! Username is invalid',
    103: 'Oops! Password is invalid',
    104: 'Please choose another username !',
    105: 'Oops! Role is invalid',
    106: 'Oops! User does not exist',
    107: 'Oops! Wrong Password',
    108: 'Oops! User already exists',
    200: 'Oops! The Hero does not exist',
    201: 'Oops! The Hero already exists',
    202: 'Oops! The Hero is invalid format',
    900: 'Oops! Cannot connect to database',
    901: 'Oops! An error has occurred',
    902: 'Oops! Invalid access token',
    903: 'Cannot cast value to ObjectId',
    USERNAME_IS_REQUIRED: 100,
    PASSWORD_IS_REQUIRED: 101,
    USERNAME_IS_INVALID: 102,
    PASSWORD_IS_INVALID: 103,
    CHOOSE_ANOTHER_USERNAME: 104,
    ROLE_IS_INVALID: 105,
    USER_DOES_NOT_EXIST: 106,
    WRONG_PASSWORD: 107,
    USER_ALREADY_EXIST: 108,
    HERO_NOT_EXIST: 200,
    HERO_IS_EXIST: 201,
    HERO_IS_INVALID: 202,
    CANNOT_CONNECT_TO_DATABASE: 900,
    AN_ERROR_HAS_OCCURRED: 901,
    INVALID_ACCESS_TOKEN: 902,
    CANNOT_CAST_OBJECTID: 903,
};

module.exports = ErrorMessage;
