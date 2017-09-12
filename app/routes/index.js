var express = require('express');
var appRoute = express.Router();

// for authenticate user
var UserController = require('../controllers/UserController');

var userRoute = require('./user');

module.exports = function (app) {
    var prefixApi = '/api';
    userRoute(prefixApi, app);
}