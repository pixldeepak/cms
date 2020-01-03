const request = require('request');

let getContent = function (req, res, callback) {

    request(req.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(response.body));
            callback();
        } else {
            res.send(500);
            callback()
        }
    });
};

let postContent = function (req, callback) {
    request.post(req, function(error, response, body){
        callback(body);
    });
};

exports.getContent = getContent;
exports.postContent = postContent;