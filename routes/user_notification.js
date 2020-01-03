'use strict';

const helper_utils = require('./util/common');

module.exports = function (router) {

    router.post('/post/user-notification', function (req, res) {
        helper_utils.makeApiRequest(req, 'POST', '/post/user-notification', function (_response) {
            res.json(_response);
        });
    });

    router.post('/get/user-notification', function (req, res) {
        helper_utils.makeApiRequest(req, 'GET', '/get/user-notification', function (_response) {
            res.json(_response);
        });
    });

    router.post('/get/user-notification/:id', function (req, res) {
        helper_utils.makeApiRequest(req, 'GET', '/get/user-notification/' + req.params.id, function (_response) {
            res.json(_response);
        });
    });

    router.get('/get/user/user-notification/:uid', function (req, res) {
        helper_utils.makeApiRequest(req, 'GET', '/get/user/user-notification/' + req.params.uid, function (_response) {
            res.json(_response);
        });
    });

    router.post('/post/user-notification/update/:id', function (req, res) {
        helper_utils.makeApiRequest(req, 'POST', '/post/user-notification/update/' + req.params.id, function (_response) {
            res.json(_response);
        });
    });

    router.post('/post/user-notification/status/active/:id', function (req, res) {
        helper_utils.makeApiRequest(req, 'POST', '/post/user-notification/status/active/' + req.params.id, function (_response) {
            res.json(_response);
        });
    });

    router.post('/post/user-notification/status/inactive/:id', function (req, res) {
        helper_utils.makeApiRequest(req, 'POST', '/post/user-notification/status/inactive/' + req.params.id, function (_response) {
            res.json(_response);
        });
    });
};
