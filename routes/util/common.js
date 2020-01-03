'use strict';

const _ = require('underscore');
const request = require('request');
const config = require('../../config/config');
const _api = config.apiEndPoint;

function checkApiResponse(response) {
    return response && response.body ? _.isObject(response.body) ? response.body : JSON.parse(response.body) : null;
}

exports.postApiRequest = function (req, res, url) {
    let options = {
        uri: _api + url,
        method: 'POST',
        json: req.body,
        headers: config.apiAccessToken
    };
    request.post(options, function (err, response) {
        let _response = checkApiResponse(response);
        res.json(_response);
    });
};

exports.makeApiRequest = function (req, type, url, cb) {
    let options = {
        uri: _api + url,
        method: type,
        json: req.body,
        headers: config.apiAccessToken
    };
    options.headers.apiHost = req.headers.host;
    options.headers.user_id = req.cookies.pixl_user_id || null;
    options.headers.user_token = req.cookies.pixl_user_token || null;

    if (type === 'POST') {
        request.post(options, function (err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if (type === 'GET') {
        request.get(options, function (err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if (type === 'PUT') {
        request.put(options, function (err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if (type === 'DELETE') {
        request.delete(options, function (err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if (type === 'IMAGE') {
        request.get(options, function (err, _response) {
            cb(_response);
        });
    }

};

exports.validateResponse = function (response) {
    checkApiResponse(response);
};
