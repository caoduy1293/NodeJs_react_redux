var userEntity = require('./userEntity');
var config = require('../../config');
var jwt = require('jsonwebtoken');

exports.userLogin = function (userObj, cb) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    userEntity.findOne({userName: userObj.userName}, function (error, user) {
        // if(error) throw error;
        if (error || !user) {
            if (error) {
                console.log(error);
            }
            result.err = 'Authentication failed.';
            cb(result);
        } else if (user) {
            user.verifyPassword(userObj.passWord, function (err, isMatch) {
                if (err) {
                    result.err = 'Authentication failed.';
                    cb(result);
                } else {
                    if (isMatch) {
                        var userTemp = {};
                        userTemp.name = user.name;
                        userTemp.userName = user.userName;
                        userTemp.admin = user.admin;
                        userTemp._id = user._id;
                        var token = jwt.sign(userTemp, config.secret, {
                            expiresIn: 60 * 60 * 24
                            // expiresInMinutes: 1440 not support this type anymore
                        });
                        result.success = true;
                        result.data = {};
                        result.data.user = userTemp;
                        result.data.token = token;

                        cb(result);
                    } else {
                        result.err = 'Authentication failed.';
                        cb(result);
                    }

                }
            });
        }
    });
};

exports.verifyToken = function (token, cb, next) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                result.err = 'Fail authenticate token.';
                cb(result);
            } else {
                console.log('user in verify: ', decoded);
                // req.userData = decoded;
                next();
            }
        });
    } else {
        result.err = 'No token provided.';
        cb(result);
    }
};

exports.getInfoFromToken = function (token, cb) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    if (token) {
        jwt.verify(token, config.secret, function (err, user) {
            if (err) {
                result.err = 'Fail to get Info';
                cb(result);
            } else {
                result.success = true;
                result.data = {};
                result.data = user;
                cb(result);
            }
        });
    } else {
        result.err = 'Fail to get Info';
        cb(result);
    }
};

exports.getUsers = function (callback) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    userEntity.find({}).select({
        "passWord": 0,
        "_id": 0
    }).limit(100).exec(function (error, recievedObjs) {
        if (error) {
            result.err = error;
        } else {
            result.success = true;
            result.data = recievedObjs;
        }
        callback(result);
    });
    // userEntity.find(function (error,recievedObjs) {
    //     if(error){
    //         result.err = error;
    //     }else{
    //         result.success = true;
    //         result.data = recievedObjs;
    //     }
    //     callback(result);
    // });
}

exports.getUser = function (id, callback) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    userEntity.findById(id, function (error, recievedObj) {
        if (error) {
            result.err = error;
        } else {
            if (recievedObj === null) {
                result.err = "object not exist.";
            } else {
                result.success = true;
                result.data = recievedObj;
            }
        }
        callback(result);
    });
}

exports.createUser = function (userObj, callback) {
    var user = new userEntity({
        name: userObj.name,
        userName: userObj.userName,
        passWord: userObj.passWord,
        admin: userObj.admin
    });
    var result = {
        success: false,
        err: null,
        data: null
    };
    user.save(function (err) {
        if (err) {
            result.err = err;
        } else {
            result.success = true;
            result.data = user;
        }
        return callback(result);
    });

};

exports.updateUser = function (id, userObj, callback) {

    var result = {
        success: false,
        err: null,
        data: null
    };

    userEntity.findById(id, function (error, recievedObj) {
        if (error) {
            result.err = error;
            callback(result);
        } else {

            if (recievedObj === null) {
                result.err = "object not exist.";
                callback(result);
            } else {
                var temp = Object.assign(recievedObj, userObj);
                recievedObj = temp;
                recievedObj.save(function (error) {
                    if (error) {
                        result.err = error;
                    } else {
                        result.success = true;
                        result.data = recievedObj;
                    }
                    callback(result);
                });
            }

        }

    });
}

exports.deleteUser = function (id, callback) {
    var result = {
        success: false,
        err: null,
        data: null
    };
    userEntity.findById(id, function (error, recievedObj) {
        if (error) {
            result.err = error;
            callback(result);
        } else {
            if (recievedObj === null) {
                result.err = "object not exist.";
                callback(result);
            } else {

                userEntity.findByIdAndRemove(id, function (error) {
                    if (error) {
                        result.err = error;
                    } else {
                        result.success = true;
                        result.data = recievedObj;
                    }
                    callback(result);
                });

            }
        }
    });
}