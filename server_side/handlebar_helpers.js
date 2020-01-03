var moment = require('moment');
var _ = require('underscore');
var base64 = require('base-64');
var utf8 = require('utf8');

exports.ifCond = function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.invtruncateTexterse(this);
    }
};

exports.ifCheckTwo = function (v1, operator, v2, v3, options) {
    switch (operator) {
        case '==':
            return (v1 === v2 && v1 === v3) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2 && v1 === v3) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2 && v1 < v3) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2 && v1 <= v3) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2 && v1 > v3) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2 && v1 >= v3) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2 && v1 !== v3) ? options.fn(this) : options.inverse(this);
        default:
            return options.invtruncateTexterse(this);
    }
};

exports.checkIndexOf = function (arr, v1, options) {
    if (arr) {
        if (arr.length) {
            if (arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
};
exports.checkIndexOfIds = function (arr, v1, options) {
    v1 = v1.toString();
    if (arr) {
        if (arr.length) {
            if (arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
};

exports.counter = function (start, limit, block) {
    var accum = '';
    var i;

    for (i = start; i <= limit; ++i) {
        accum = accum + block.fn(i);
    }

    return accum;
};
exports.counterReverse = function (start, end, block) {
    var accum = '';
    var i;

    for (i = start; i >= end; --i) {
        accum = accum + block.fn(i);
    }

    return accum;
};

exports.countFullStar = function (rating) {
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 ? Math.floor(rating) : Math.ceil(rating);
};

exports.countHalfStar = function (rating) {
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 1 : 0;
};

exports.countEmptyStar = function (rating) {
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 4 - Math.floor(rating) : 5 - Math.ceil(rating);
};

exports.truncateText = function (text, min, max) {
    if (text && text.length > 1) {
        var _total = Number(text.length);
        var _min = Number(min) || 0;
        var _max = max ? Number(max) : Number(text.length);
        if (text.length > max)
            return text.substring(_min, _max) + '<span class="js_extra_text">... </span><span class="js_show_more_txt btn-link">more</span><span class="js_all_text hide">' + text.substring(_max, _total) + '</span><span class="js_show_less_txt btn-link hide"> less</span>';
        else
            return text;
    }
    else {
        return '';
    }
};

exports.plus = function (num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    return num1 + num2;
};

exports.cleanString = function (text) {
    if (text) {
        text = text.toString();
        text = text.split(' ');
        text = text.join('_').toLocaleLowerCase();
    }
    return text;
};

exports.removeSpaceAndLinkByHyphen = function (text) {
    if (text) {
        text = text.toString();
        text = text.split(' ');
        text = text.join('-').toLocaleLowerCase();
    }
    return text;
};

exports.constructPhotoUrl = function (url, width, height) {
    if (url) {
        url = url.replace('upload/', 'upload/c_fill,h_' + height + ',w_' + width + '/');
        return url;
    }

    return '/img/default_img.png';
};

exports.printObj = function (obj) {
    console.log(obj);
    return '';
};

exports.checkQuery = function (query, val, options) {
    if (query) {
        if (query.hasOwnProperty('category')) {
            if (query.category === val) {
                return options.fn(this);
            }
        }
    }

    return options.inverse(this);
};

exports.inc = function (value, options) {
    return parseInt(value) + 1;
};

exports.cleanStringForUrl = function (_str) {
    if (_str) {
        _str = _str.replace(/\s/g, '-');
    }
    return (_str);
};

exports.json = function (context) {
    return JSON.stringify(context);
};

exports.checkIndexOf = function (arr, v1, options) {
    if (arr && arr.length && v1) {
        if (arr.indexOf(v1) > -1) {
            return options.fn(this);
        }
        return options.inverse(this);
    } else {
        return options.inverse(this);
    }
};

exports.getCrid = function (_id) {
    if (_id) {
        let bytes = utf8.encode(_id);
        return base64.encode(bytes);
    } else {
        return '';
    }
};

exports.partial = function (name) {
    return name;
};

exports.formatDate = function (dateString, format) {
    if (dateString && format) {
        return moment(dateString).format(format)
    } else {
        return ''
    }
};

exports.searchPagination = function (page) {
    if (page && page.total && page.limit) {
        var html = '';
        var _current = parseInt(page.current) ? parseInt(page.current) : 0;
        var _total = parseInt(page.total);
        var _limit = parseInt(page.limit);
        var total_avail = _total >= 10 ? Number(_total / _limit) : 1;
        total_avail = total_avail ? Math.ceil(total_avail) : 1;
        var start = 1;
        if (_current !== 0) {
            start = parseInt((_current / 5)) * 5;
            start = start + 1;
        }
        var _max_end = start + 4;
        _current = _current + 1;
        for (var i = start; i <= total_avail; i++) {
            var _active_pg = i === _current ? 'in_active' : '';
            var class_name = (i > _max_end) ? ' hide' : '';
            html = html + '<li class="js_page_link ' + _active_pg + class_name + '"><span class="js_search_pagination" data-page="' + i + '">' + i + '</span></li>'
        }
        return html;
    } else {
        return ''
    }
};

exports.countDateDiff = function (dateArry) {
    var _total_months = 0;
    var _date_1 = '';
    var _date_2 = '';
    if (dateArry.length) {

        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }

        for (var i = 0; i < dateArry.length; i++) {

            _date_1 = new Date(dateArry[i].start_date);
            _date_2 = new Date(dateArry[i].end_date);

            _total_months += monthDiff(_date_1, _date_2);
        }

        if (_total_months) {
            var _year = parseInt(_total_months / 12);
            var _month = _total_months % 12;

            return _year + "." + _month + " years";
        }
        else {
            return '';
        }

    } else {
        return ''
    }
};
