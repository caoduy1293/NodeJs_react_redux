var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    userName: {
        type: String,
        unique: true,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    admin: Boolean
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('passWord')) return next();
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.passWord, salt, null, function (err, hash) {
            if (err) return next(err);
            user.passWord = hash;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (passWord, cb) {
    bcrypt.compare(passWord, this.passWord, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', userSchema);