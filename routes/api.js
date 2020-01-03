'use strict';

const express = require('express');
const router = express.Router();
const _ = require('underscore');
const helper_utils = require('./util/common');

function setUserCookies(_response, res) {
    if (_response && !_response.err && _response.data) {
        let d = new Date();
        d.setDate(d.getDate() + 30);
        res.cookie('pixl_user_id', _response.data.user_id, {maxAge: 30 * 24 * 60 * 60 * 1000});
        res.cookie('pixl_user_token', _response.data.token, {maxAge: 30 * 24 * 60 * 60 * 1000});
        res.json(_response);
    } else {
        res.json({err: true, msg: _response.msg || 'Something went wrong', user: null});
    }
}

router.post('/register', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/register', function (_response) {
        setUserCookies(_response, res);
    });
});

router.post('/login', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/login', function (_response) {
        setUserCookies(_response, res);
    });
});

router.post('/forgot-password', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/password/reset/token/create', function (_response) {
        res.json(_response);
    });
});

router.post('/update-password', function (req, res) {
    helper_utils.makeApiRequest(req, 'PUT', '/password/update', function (_response) {
        res.json(_response);
    });
});

router.post('/user/details', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/checkLogin', function (_response) {
        res.json(_response);
    });
});

router.post('/user/signup/google', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/auth/googleplus', function (_response) {
        setUserCookies(_response, res);
    });
});

router.post('/user/signup/fb', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/auth/facebook', function (_response) {
        setUserCookies(_response, res);
    });
});

router.post('/user/signup/linkedIn', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/auth/linkedIn', function (_response) {
        setUserCookies(_response, res);
    });
});

router.post('/user/profile/basic-details', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/basic-details/' + req.cookies.pixl_user_id, function (_response) {
        res.json(_response);
    });
});

router.post('/password/reset', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/password/reset', function (_response) {
        res.json(_response);
    });
});

router.post('/user/password/update', function (req, res) {
    helper_utils.makeApiRequest(req, 'POST', '/user/password/update', function (_response) {
        res.json(_response);
    });
});




require('./user_notification')(router);
require('./util_apis')(router);

module.exports = router;