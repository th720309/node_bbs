var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CommentSchema = new Schema({
    topic_id: {type: ObjectId},
    author: {name: {type: String}, avatar: {type: String}},
    content: {type: String},
    create_at: {type: String},
    update_at: {type: Date, default: Date.now}
});


CommentSchema.index({topic_id: 1, update_at: 1});
CommentSchema.index({'author.name': 1, update_at: 1});


module.exports = mongoose.model('Comment', CommentSchema);