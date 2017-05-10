var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String, unique: true, required: true},
    sex: {type: String},
    grade: {type: String},
    mail: {type: String},
    password: {type: String},
    avatar: {type: String}, //头像图片名称
    score: {type: Number, default: 0},
    collect:{type:Array},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

UserSchema.pre('save', function (next) {
    this.update_at = new Date();
    next();
});
//设置索引
UserSchema.index({name: 1});

module.exports = mongoose.model('User', UserSchema);