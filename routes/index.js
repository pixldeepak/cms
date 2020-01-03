'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const helper_utils = require('./util/common');
const _ = require('underscore');

router.get('/', function(req, res) {
    helper_utils.makeApiRequest(req, 'GET', '/user/basic-details/' + req.cookies.pixl_user_id, function(_response) {
        res.render('dashboard', {
            // data:_response.data
        });
    });
});

router.get('/dash', function(req, res) {
    helper_utils.makeApiRequest(req, 'GET', '/user/basic-details/' + req.cookies.pixl_user_id, function(_response) {
        res.render('dashboard1', {
            // data:_response.data
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/forgot-password', function(req, res) {
    res.render('forgot_password');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/user/activate/:id', function(req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/activate/' + req.params.id, function(_response) {
        if(_response && !_response.err) {
            res.render('login');
        } else {
            res.render('404');
        }
    });
});

router.get('/user/reset-password/:token', function(req, res) {
    res.render('update_password', {token:req.params.token});
});

router.get('/logout', function(req, res) {
    res.cookie('pixl_user_id', '', {expires:new Date(0)});
    res.cookie('pixl_user_token', '', {expires:new Date(0)});
    res.redirect('/');
});

router.get('/change_password', function(req, res) {
    res.render('change_password');
});

router.get('/separation_request', function(req, res) {
    res.render('separation_request');
});

router.get('/dashboard', function(req, res) {
    res.render('dashboard');
});

require('./cdn')(router);

module.exports = router;