var User = require('../models').User;

exports.addUser = function (data) {
    var user = new User(data);
    return user.save(); //返回一个promise对象
};

exports.getAll = function () {
    return User.find({}).exec();
};

exports.remove = function (name) {
    var query = name ? {name: name} : {};
    return User.remove(query).exec()
};

exports.getUserById = function (id) {
    return User.findOne({_id: id}).exec();  //返回一个promise对象
};

exports.getUserByName = function (name) {
    return User.findOne({name: name}).exec(); //返回一个promise对象
};

exports.addCollect = function (id, collect) {
    return User.findOneAndUpdate({_id: id}, {
        $push: {
            'collect': {
                topicId: collect.topicId,
                topicTitle: collect.topicTitle,
                topicTab: collect.topicTab,
                topictime: collect.topictime,
                topicAuthor: collect.topicAuthor,
                topicAuthoravatar: collect.topicAuthoravatar,
                topicComment: collect.topicComment,
                topicpv: collect.topicpv
            }
        }
    }, {new: true}).exec();
};

exports.delCollect = function (id, topicId) {
    return User.findOneAndUpdate({_id: id}, {
        $pull: {
            'collect': {topicId}
        }
    }).exec()
}

exports.incScore = function (id, step) {
    return User.findOneAndUpdate({_id: id}, {$inc: {score: step}}, {new: true}).exec();
};

