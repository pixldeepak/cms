var qs = require('querystring');

module.exports = {
    makeAjaxRequest: function (url, query, method, dataType, data, callback) {
        if (!url) {
            return false;
        }

        //adding query with url
        url = qs.stringify(query) ? (url + '?' + qs.stringify(query)) : url;

        var reqObj = {
            url: url,
            method: method,
            dataType: dataType,
            data: data,
            success: function (res) {
                callback(res);
            },
            error: function (err) {
                callback(err);
            }
        };

        //Make ajax request with given details
        $.ajax(reqObj);
    },

    makeFileUploadRequest: function (url, query, method, dataType, data, callback) {
        if (!url) {
            return false;
        }

        //adding query with url
        url = qs.stringify(query) ? (url + '?' + qs.stringify(query)) : url;

        //Make ajax request with given details
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                callback(res);
            },
            error: function (err) {
                window.trackOnMixpanel("Client Api File Upload Error", {url: url, method: method, err: err});
                callback(err);
            }
        });
    },
};