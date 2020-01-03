'use strict';

const url = require('url');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/s3_config.json');
const s3Bucket = new AWS.S3({params:{Bucket:'hrm'}});
const helper_utils = require('../helpers/file.upload');

function returnImageFile(req, res) {
    let _url = url.parse(req.url).pathname;
    _url = _url.replace('/cdn', '');
    _url = _url.replace(/^\//, '');
    let params = {Bucket:'hrm-static', Key:_url};
    console.log(params);
    s3Bucket.getObject(params, function(err, data) {
        if(err) {
            res.render('404');
        } else {
            res.writeHead(200, {
                'Content-Type'  :data.ContentType,
                'Content-Length':data.Body.length
            });
            res.end(data.Body);
        }
    });
}

module.exports = function(router) {
    router.get('/cdn/:filePath*', function(req, res, next) {
        returnImageFile(req, res);
    });

    router.post('/cdn/upload-file', function(req, res) {
        return helper_utils.uploadFiles(req, res);
    });
};