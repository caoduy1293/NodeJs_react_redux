var userModel = require('../models/user/user');
var requestFilter = require('../helper/requestFilter');


exports.authenticate = function (req, res) {
    var userObj = {};
    userObj.userName = req.body.userName;
    userObj.passWord = req.body.passWord;
    userModel.userLogin(userObj, function (result) {
        if (result) {
            res.json(result);
        }
    });
};

exports.verifyToken = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    userModel.verifyToken(token, function (result) {
        if (result) {
            res.json(result);
        }
    }, next);
};

exports.getInfoFromToken = function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log('bi cuc cuc j o day');
    userModel.getInfoFromToken(token, function (result) {
        if (result) {
            res.json(result);
        }
    });
};

exports.getUsers = function (req, res) {
    userModel.getUsers(function (result) {
        if (result) {
            res.json(result);
        }
    });
};
exports.getUser = function (req, res) {
    var id = req.params.user_id;
    userModel.getUser(id, function (result) {
        if (result) {
            res.json(result);
        }
    });
}
exports.createUser = function (req, res) {
    if (requestFilter.checkRequireUserBody(req, res)) {
        var userObj = {
            name: req.body.name || '',
            userName: req.body.userName,
            passWord: req.body.passWord,
            admin: req.body.admin || false
        };
        userModel.createUser(userObj, function (result) {
            if (result) {
                res.json(result);
            }
        });
    }
}
exports.updateUser = function (req, res) {
    var id = req.params.user_id;
    if (requestFilter.checkRequireUserBody(req, res)) {
        var userObj = {
            name: req.body.name || '',
            userName: req.body.userName,
            passWord: req.body.passWord,
            admin: req.body.admin || false
        };
        userModel.updateUser(id, userObj, function (result) {
            if (result) {
                res.json(result);
            }
        });
    }

}

exports.deleteUser = function (req, res) {
    var id = req.params.user_id;
    userModel.deleteUser(id, function (result) {
        if (result) {
            res.json(result);
        }
    });
}

// function responseJson(result){
//     if (result) {
//             res.json(result);
//         }
// }