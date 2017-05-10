var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var User = require('../proxy').User;
var Topic = require('../proxy').Topic;
var Comment = require('../proxy').Comment;
var checkLogin = require('../middlewares/check').checkLogin;
var moment = require('moment');
router.get('/:name', function (req, res, next) {
    var name = req.params.name;
    Promise.all([
        Topic.getTopics({'author.name': name}),
        Comment.getComments(name),
        User.getUserByName(name)
    ]).then(function ([topics, comments, user]) {
        user.createAt = moment(user.create_at).format('YYYY-MM-DD');
        res.render('user', {title: '个人主页', topics: topics, comments: comments, user: user})
    })
});

// GET /:name/topics?page=1 主页
router.get('/:name/topics', function (req, res,next) {
    var name = req.params.name;
    var page = req.query.page || 1;

    Promise.all([Topic.getTopicsByCount({'author.name': name}),
        Topic.getTopics({'author.name': name},page)])

        .then(function ([Count, topics]) {
            var pageRender = {start: 1, end: 0};
            var pageNum;
            // 每页显示15条，根据页数决定如何渲染分页组件
            pageNum = Math.ceil(Count / 15);
            if (pageNum <= 5) {
                pageRender.end = pageNum;
            } else {
                pageRender.start = page;
                // 分页组件每次只显示5页，前后显示省略号
                pageRender.end = parseInt(page) + 5
            }
            res.render('usertopics', {
                title: '我创建的',
                topics: topics,
                pageRender: pageRender,
                pageNum: pageNum
            })
        })
        .catch(next)
});
// GET /:name/collection 主页
router.get('/:name/collection', function (req, res,next) {
    var name = req.params.name;
    var page = req.query.page || 1;

    Promise.all([User.getUserByName(name)])

        .then(function ([topics]) {

            res.render('usercollection', {
                title: '我的收藏',
                topics: topics,
            })
        })
        .catch(next)
});
module.exports = router;
