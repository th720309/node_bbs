var Topic = require('../models').Topics;

exports.addTopic = function (data) {
    var topic = new Topic(data);
    return topic.save();
};

exports.findAndUpdate = function (id, data) {
    return Topic.findOneAndUpdate({_id: id}, {
        $set: {
            title: data.title,
            tab: data.tab,
            content: data.content,
            originContent: data.originContent
        }
    }, {new: true}).exec();
}

exports.getTopicById = function (id) {
    return Topic.findOneAndUpdate({_id: id}, {$inc: {pv: 1}}, {new: true}).exec();
};

exports.getTopics = function (options, page) {
    var query = options ? options : {};
    if (query.tab === 'all') query = {};
    return Topic.find(query).sort('-_id').skip((page - 1) * 15).limit(15).exec();
};
exports.getTopicsByCount = function(options){
    var query = options ? options : {};
    if (query.tab === 'all') query = {};
    return Topic.find(query).count()
}
exports.getTopicsCount = function () {
    return Topic.count()
};

exports.incComment = function (id) {
    return Topic.findOneAndUpdate({_id: id}, {$inc: {comment: 1}}, {new: true}).exec()
};

exports.getAll = function () {
    return Topic.find({}).exec()
};

