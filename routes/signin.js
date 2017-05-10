var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var User = require('../proxy').User;
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signin', {title: '登录'});
});

// POST /signin 处理用户登录
router.post('/', checkNotLogin, function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;

    User.getUserByName(name).then(function (user) {
        if (!user) {
            req.flash('error', '用户名不存在');
            return res.redirect('/signin');
        }
        // 检查密码是否匹配
        if (sha1(password) !== user.password) {
            req.flash('error', '用户名或密码错误');
            return res.redirect('/signin');
        }
        // 将一些信息保存在session中
        req.session.user = {
            name: name,
            sex: user.sex,
            grade: user.grade,
            _id: user._id,
            avatar: user.avatar,
            score: user.score
        };
        // 跳转到主页
        res.redirect('/');
    }).catch(next)
});

module.exports = router;