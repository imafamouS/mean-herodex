const TAG = 'UserModel ';

const Mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');

const TextUtils = require('../commons/text-utils');
const ErrorMessage = require('../commons/error-message');

const UserValidation = require('../validations/user.validation.js');

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {unique: true},
        min: 4,
        validate: [UserValidation.username, ErrorMessage[104]],
    }, password: {
        type: String,
        required: true,
        trim: true,
        min: 4,
        validate: [UserValidation.password, ErrorMessage[103]],
    }, role: {
        type: String,
        trim: true,
        default: 'user',
        validate: [UserValidation.role, ErrorMessage[105]],
    },
});

UserSchema.pre('save', function(next) {
    hashPassword(this, next);
});

function hashPassword(_user, next) {
    let user = _user;
    if (!user.isModified('password')) {
        return next();
    }
    TextUtils.hash(user.password)
             .then(hash => {
                 user.password = hash;
                 next();
             })
             .catch(err => {
                 return next(err);
             });
}

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    Bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

const User = Mongoose.model('User', UserSchema);

module.exports = User;
