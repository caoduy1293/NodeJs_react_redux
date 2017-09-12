var express = require('express');
var UserController = require('../controllers/UserController');
var userRoute = express.Router();

module.exports = function (preFix, app) {
    userRoute.post('/authenticate', UserController.authenticate);

    // middleware to require token
    userRoute.use(UserController.verifyToken);

    userRoute.get('', UserController.getUsers);
    userRoute.get('/:user_id', UserController.getUser);
    userRoute.post('', UserController.createUser);
    userRoute.put('', UserController.updateUser);
    userRoute.delete('/:user_id', UserController.deleteUser);
    userRoute.get('/me/myInfo', UserController.getInfoFromToken);

    app.use(preFix + '/users', userRoute);
}