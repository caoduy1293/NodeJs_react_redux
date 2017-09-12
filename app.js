var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

//file include CONST variable
var config = require('./app/config');
// define routes
var routes = require('./app/routes/index');

var port = process.env.PORT || 3000;
// trigger app express js
var app = express();

mongoose.connect(config.database);
//set global variable
app.set('superSecret', config.secret);

// middleware bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// route app 
routes(app);

module.exports = app;
