var Comment = require('../models').Comment;
exports.addComment = function (data) {
    var comment = new Comment(data);
    return comment.save()
};

exports.getComments = function (name) {
    var query = name ? {'author.name': name} : {};
    return Comment.find(query).sort('update_at').exec()
}

exports.getCommentsByTopicId = function (id) {
    return Comment.find({topic_id: id}).sort('update_at').exec()
};