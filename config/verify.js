'use strict';

const helper_utils = require('../routes/util/common');
const config = require('./config');

exports.clearUserCookie = function (req, res, next) {
    res.clearCookie("tr_user_id");
    res.clearCookie("tr_user_token");
    next();
};

function clearCookie(req, res) {
    if (req.session && req.session.user) {
        req.session.user = [];
    }
    res.clearCookie("tr_user_token");
    res.clearCookie("tr_user_id");
}

exports.allowCrawlerAndLoggedUser = function (req, res, next) {
    //Allow only social media pages
    var botPattern = "(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
    var re = new RegExp(botPattern, 'i');
    var userAgent = req.get('user-agent');
    var userAgentArr = userAgent.split(' ');
    if (re.test(userAgent) || userAgentArr.indexOf('Twitterbot/1.0') !== -1 ||
        userAgentArr.indexOf('facebookexternalhit/1.1') !== -1 ||
        userAgentArr.indexOf('Google') !== -1 ||
        userAgentArr.indexOf('(+https://developers.google.com/+/web/snippet/)') !== -1) {
        next()
    } else {
        req.body.user_id = req.cookies.tr_user_id;
        req.body.token = req.cookies.tr_user_token;
        helper_utils.makeApiRequest(req, 'POST', '/user/checkLogin', function (_response) {
            if (_response && _response.err) {
                clearCookie(req, res);
                res.redirect('/login');
            } else {
                next()
            }
        });
    }
};

function checkLogin(req, cb) {
    if (req.cookies && req.cookies.pixl_user_id && req.cookies.pixl_user_token) {
        //Make api call to backend and check is user is valid
        helper_utils.makeApiRequest(req, 'POST', '/checkLogin', function (_response) {
            cb(_response);
        });
    } else {
        cb({err: true, msg: 'User Not Logged in'});
    }
}

exports.isLoggedIn = function (req, res, next) {
    let userActivateUrlRegx = new RegExp("^\/user\/activate\/[0-9,a-z,A-Z^)]*");
    let access_token = config.apiAccessToken.access_token;
    if (req.path === '/login' ||
        req.path === '/api/login' ||
        req.path === '/login' ||
        userActivateUrlRegx.test(req.path) ||
        req.path === '/logout' ||
        req.path === '/checkLogin') {

        //Allow user to go to next page
        next();

    } else {
        checkLogin(req, function (data) {
            if (data.err) {
                //Clear User cookie
                clearCookie(req, res);

                //Redirect To Login Page
                res.redirect('/login?ref=' + req.originalUrl);

            } else {
                next();
            }
        });
    }
};

exports.getUserIdFromSession = function (req, res, next) {
    if (req.session.hasOwnProperty('user')) {
        return req.session.user.user_id;
    } else {
        res.redirect('/login?ref=' + req.originalUrl);
    }
};