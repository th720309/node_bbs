var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var User = require('../proxy').User;
var multer = require('multer');
// multer中间件用于处理文件保存
var storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'), //保存头像的路径
    // 设置保存时的文件名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({storage: storage});

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 渲染注册页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup', {title: '注册'});
});

// POST /signup 处理用户注册请求
router.post('/', checkNotLogin, upload.single('avatar'), function (req, res, next) {
    var name = req.body.name;
    var sex = req.body.sex;
    var grade = req.body.grade;
    var mail = req.body.mail;
    var avatar = req.file ? req.file.path.split(path.sep).pop() : ''; // 获得文件名
    var password = req.body.password;
    var repassword = req.body.repassword;

    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup')
    }

    password = sha1(password);
    var user = {
        name: name,
        sex: sex,
        grade: grade,
        mail: mail,
        password: password,
        avatar: avatar || 'default.jpg' //没有上传头像时用默认头像
    };
    User.getUserByName(name).then(function (u) {
        if (u) {
            req.flash('error', '用户名已被占用');
            return res.redirect('/signup');
        } else {
            User.addUser(user).then(function (result) {
                req.session.user = {
                    name: result.name,
                    _id: result._id,
                    sex: result.sex,
                    grade: result.grade,
                    avatar: result.avatar,
                    score: result.score
                };
                res.redirect('/')
            }).catch(next)
        }
    })
});

module.exports = router;