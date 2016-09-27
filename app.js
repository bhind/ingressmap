"use sttict";
"use strict";
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var TheApp = (function () {
    function TheApp() {
        this.app = express();
    }
    TheApp.prototype.execute = function () {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(stylus.middleware({
            src: __dirname + '/views',
            dest: __dirname + '/public',
            compile: function (str, path) {
                return stylus(str)
                    .set('filename', path)
                    .set('compress', true)
                    .use(nib());
            }
        }));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/', routes);
        this.app.use('/users', users);
        this.app.get('/ingressmap.html', function (req, res) {
            res.render('ingressmap', {
                clientId: process.env.GMAIL_CLIENT_ID,
                mapApiKey: process.env.GOOGLE_MAPS_API_KEY
            });
        });
        this.app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        if (this.app.get('env') === 'development') {
            this.app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = this.app;
    };
    return TheApp;
}());
var express_app = new TheApp();
express_app.execute();
