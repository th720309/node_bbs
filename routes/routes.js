module.exports = function (app) {
    app.use('/',require('./index'));
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/topic', require('./topics'));
    app.use('/user', require('./user'));
};