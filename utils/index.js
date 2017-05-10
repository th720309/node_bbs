var xss = require('xss');
var options = {};

//预留可配置xss过滤选项，详情访问https://github.com/leizongmin/js-xss/blob/master/README.zh.md
var myxss = new xss.FilterXSS(options);

//将从服务器读出的时间转成yyyy-mm-dd的形式
exports.parseDate = function (date) {
    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDay();
};

exports.xssfilter = function (input) {
    return myxss.process(input);
};