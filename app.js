'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const app = express();
const winston = require('winston');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const index = require('./routes/index');
const api = require('./routes/api');
const helmet = require('helmet');
const verify = require('./config/verify');

// view engine setup
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views',
    helpers: require('./server_side/handlebar_helpers'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.engine('handlebars', exphbs());
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
 app.use(favicon(path.join(__dirname, 'public', '/img/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(helmet());

/**
 * Logging
 */
global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString()
            },
            json: true
        }),
    ]
});

//app.use(verify.isLoggedIn);
app.use('/', index);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function (err, req, res, next) {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {url: req.url});
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({error: 'Not found'});
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

module.exports = app;
