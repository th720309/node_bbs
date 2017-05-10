var mongoose = require('mongoose');
var config = require('../config/default');
mongoose.connect(config.mongodb, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.mongodb, err.message)
    }
});
exports.User = require('./users');
exports.Topics = require('./topics');
exports.Comment = require('./comment');

