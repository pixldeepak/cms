'use strict';

const request = require('request').defaults({encoding: null});

const helper_utils = require('./util/common');
const _country_list = require('../data/country.json');

module.exports = function (router) {

    router.post('/util/upload/user-img/data-uri', function (req, res) {
        let _img = '';
        if (req.body.url) {
            request.get(req.body.url, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let imageType = response.headers['content-type'];
                    _img = new Buffer(body, 'binary').toString('base64');
                    _img = 'data:' + imageType + ';base64,' + _img;
                }
                req.body = {
                    src: _img
                };
                helper_utils.makeApiRequest(req, 'POST', '/user/profile/image-upload', function (_response) {
                    res.json(_response);
                });
            });
        } else {
            res.json({err: true, msg: 'Params missing', data: null})
        }
    });

    router.get('/util/get/country-list', function (req, res) {
        res.json({err: false, msg: 'Data found', data: _country_list})
    })
};
