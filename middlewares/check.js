module.exports = {
    //根据session.user字段检测是否登录,未登录时跳转
    checkLogin: function (req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect('/signin');
        }
        next();
    },
    //已登录时返回上一个页面
    checkNotLogin: function (req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录');
            return res.redirect('back');
        }
        next();
    }
};