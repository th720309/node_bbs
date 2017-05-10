var mongoose = require('mongoose');
var marked = require('marked');
var Schema = mongoose.Schema;
var moment = require('moment');
var TopicSchema = new Schema({
    title: {type: String},
    content: {type: String},
    originContent: {type: String},
    author: {name: {type: String}, avatar: {type: String}},
    pv: {type: Number},
    tab: {type: String},
    comment: {type: Number, default: 0},
    create_at: {type: String},
    update_at: {type: Date, default: Date.now}
});


TopicSchema.index({'author.name': 1, update_at: -1});

module.exports = mongoose.model('Topic', TopicSchema);