var moment = require('moment');

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
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
            return options.inverse(this);
    }
});

Handlebars.registerHelper('checkIndexOf', function (arr, v1, options) {
    if (arr) {
        if (arr.length) {
            if (arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

Handlebars.registerHelper('counter', function (start, limit, block) {
    var accum = '';
    var i;

    for (i = start; i <= limit; ++i) {
        accum = accum + block.fn(i);
    }

    return accum;
});
Handlebars.registerHelper('counterReverse', function (start, end, block) {
    var accum = '';
    var i;

    for (i = start; i >= end; --i) {
        accum = accum + block.fn(i);
    }

    return accum;
});

Handlebars.registerHelper('countFullStar', function (rating) {
    rating = parseFloat(rating);
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 ? Math.floor(rating) : Math.ceil(rating);
});

Handlebars.registerHelper('countHalfStar', function (rating) {
    rating = parseFloat(rating);
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 1 : 0;
});

Handlebars.registerHelper('countEmptyStar', function (rating) {
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 4 - Math.floor(rating) : 5 - Math.ceil(rating);
});

Handlebars.registerHelper('truncateText', function (text, min, max) {
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
});

Handlebars.registerHelper('checkPagination', function (pageNo, total, current) {
    var id = parseInt(current / 10) + 1;
    id = id * 10;
    if (Number(pageNo) > id) {
        return 'hide js_page_next';
    } else if (Number(pageNo) < current) {
        if (Number(pageNo) < Number(id - 9)) {
            return 'js_page_prev hide';
        } else {
            return 'js_page_prev';
        }
    }
    return '';
});

Handlebars.registerHelper('checkPaginationPrev', function (current) {
    if (current < 10) {
        return 'in_active';
    }
    return '';
});

Handlebars.registerHelper('checkPaginationNext', function (total, current) {
    var id = parseInt(current / 10);
    if (id !== 1) {
        id = id + 1
    }
    id = id * 10;
    if (id > total) {
        return 'in_active';
    } else {
        return '';
    }
});

Handlebars.registerHelper('removeSpaceAndLink', function (text) {
    text = text.split(' ');
    text = text.join('_').toLocaleLowerCase();
    return text;
});

Handlebars.registerHelper('removeSpaceAndLinkByHyphen', function (text) {
    text = text.split(' ');
    text = text.join('-').toLocaleLowerCase();
    return text;
});

Handlebars.registerHelper('constructIngredientPhotoUrl', function (url, width, height) {
    if (url) {
        url = url.replace('upload/', 'upload/h_' + height + ',w_' + width + '/');
        return url;
    }

    return '/img/default_img.png';
});

Handlebars.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('checkIndexOf', function (arr, v1, options) {
    if (arr) {
        if (arr.length) {
            if (arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

Handlebars.registerHelper('formatDate', function (dateString, format) {
    if (dateString && format) {
        return moment(dateString).format(format)
    } else {
        return ''
    }
});

Handlebars.registerHelper('cleanString', function (text) {
    if (text) {
        text = text.toString();
        text = text.split(' ');
        text = text.join('_').toLocaleLowerCase();
    }
    return text;
});

Handlebars.registerHelper('cleanStringForUrl', function (_str) {
    if (_str) {
        _str = _str.replace(/\s/g, '-');
    }
    return (_str);
});

Handlebars.registerHelper('searchPagination', function (page) {
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
        for (var i = 1; i <= total_avail; i++) {
            var _active_pg = i === _current ? 'in_active' : '';
            var class_name = (i > _max_end) ? ' hide' : '';
            class_name = (i < start) ? class_name + ' hide' : class_name;
            html = html + '<li class="js_page_link ' + _active_pg + class_name + '"><span class="js_search_pagination" data-page="' + i + '">' + i + '</span></li>'
        }
        return html;
    } else {
        return ''
    }
});
