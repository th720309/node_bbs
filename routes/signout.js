var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 处理登出请求
router.get('/', checkLogin, function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;