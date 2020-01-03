'use strict';

const crypto = require('crypto');
const AWS = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');
AWS.config.loadFromPath('./config/s3_config.json');
const s3Bucket = new AWS.S3({params:{Bucket:'hrm-static'}});

function uploadFileData(req, _data, res) {
    // Generate random string
    let seed = crypto.randomBytes(6);
    let uniqueSHA1String = crypto
        .createHash('sha1')
        .update(seed)
        .digest('hex');

    let uniqueRandomImageName = 'file-' + uniqueSHA1String;

    // Save decoded binary image to s3
    try {
        let fileName = uniqueRandomImageName;
        s3Bucket.putObject({
            Key        :fileName,
            Body       :fs.createReadStream(_data.path),
            ContentType:_data.type
        }, function(err, data) {
            if(err) {
                console.log(err);
                console.log('Error uploading data: ', data);
                return res.json({err:true, msg:'Not able to upload the file', data:null})
            }
            return res.json({err:false, msg:'Success', data:'/cdn/' + fileName});
        });
    }
    catch(error) {
        console.log('ERROR:', error);
        return res.json({err:true, msg:'Not able to upload the file', data:null})
    }
}

function checkFile(req, res) {
    let form = new formidable.IncomingForm();
    form.multiples = false;
    form.on('file', function(field, file) {
        if(file && file.path) {
            return fs.readFile(file.path, function(err, data) {
                if(err) {
                    return res.json({err:true, msg:'Not able to read the file', data:null})
                }
                return uploadFileData(req, file, res);
            });
        }
        return res.json({err:true, msg:'Not able to find the file', data:null})
    });

    // log any errors that occur
    form.on('error', function(err) {
        return res.json({err:true, msg:'Not able to read the file', data:null})
    });

    // parse the incoming request containing the form data
    form.parse(req);
}

exports.uploadFiles = (req, res) => {
    return checkFile(req, res);
};