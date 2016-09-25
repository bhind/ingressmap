/**
 * Created by bhind on 9/24/16.
 */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
// let app = express();
var TheApp = (function () {
    function TheApp() {
        this.app = express();
    }
    TheApp.prototype.execute = function () {
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(stylus.middleware({ src: __dirname + '/views', dest: __dirname + '/public', compile: compile }));
        // uncomment after placing your favicon in /public
        // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handlers
        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = this.app;
        function compile(str, path) {
            return stylus(str)
                .set('filename', path)
                .set('compress', true)
                .use(nib());
        }
    };
    return TheApp;
})();
var theApp = TheApp();
theApp.execute();
