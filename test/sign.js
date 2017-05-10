var path = require('path');
var app = require('../app');
var should = require('should');
var request = require('supertest').agent(app);
var User = require('../proxy').User;
var sha1 = require('sha1');

describe('sign', function () {

    before(function (done) {
        User.addUser({
                name: 'testname',
                password:sha1('111111')
            })
            .then(function () {
                done()
            })
            .catch(done)
    });

    after(function (done) {
        User.remove()
            .then(function () {
                done()
            })
            .catch(done)
    });

    describe('/signin', function () {

        it('should visit signin page', function (done) {
            request.get('/signin')
                .end(function (err, res) {
                    res.text.should.containEql('用户名');
                    res.text.should.containEql('密码');
                    done(err)
                })
        });

        it('signin name not exist', function (done) {
            request.post('/signin')
                .send({
                    name: '',
                    password: '111111'
                })
                .redirects()
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.text.should.containEql('用户名不存在');
                    done(err);
                })
        });

        it('signin password wrong', function (done) {
            request.post('/signin')
                .send({
                    name: 'testname',
                    password: '111111111'
                })
                .redirects()
                .end(function (err, res) {
                    res.text.should.containEql('用户名或密码错误');
                    done(err);
                })
        });

        it('login in successful', function (done) {
            request.post('/signin')
                .send({
                    name: 'testname',
                    password: '111111'
                })
                .end(function (err, res) {
                    res.status.should.equal(302);
                    res.headers.location.should.equal('/');
                    done(err);
                })
        });

    });

    describe('/signout', function () {
        it('should signout', function (done) {
            request.get('/signout')
                .end(function (err, res) {
                    res.status.should.equal(302);
                    res.headers.location.should.equal('/');
                    done(err)
                })
        });
    });

    describe('/signup', function () {

        it('should visit signup page', function (done) {
            request.get('/signup')
                .end(function (err, res) {
                    res.text.should.containEql('用户名');
                    res.text.should.containEql('重复密码');
                    done(err)
                })
        });

        it('signup password wrong', function (done) {
            request.post('/signup')
                .send({
                    name: 'abc',
                    password: '11',
                    repassword: '11'
                })
                .redirects()
                .end(function (err, res) {
                    res.text.should.containEql('密码至少 6 个字符');
                    done(err)
                })
        });

        it('signup name wrong', function (done) {
            request.post('/signup')
                .send({
                    name: 'abcssssdadadweqeqeqe',
                    password: '11',
                    repassword: '11'
                })
                .redirects()
                .end(function (err, res) {
                    res.text.should.containEql('名字请限制在 1-10 个字符');
                    done(err)
                })
        });

        it('signup repassword wrong', function (done) {
            request.post('/signup')
                .send({
                    name: 'abc',
                    password: '1111111',
                    repassword: '112341'
                })
                .redirects()
                .end(function (err, res) {
                    res.text.should.containEql('两次输入密码不一致');
                    done(err)
                })
        });

        it('signup name exist', function (done) {
            request.post('/signup')
                .send({
                    name: 'testname',
                    password: '111111',
                    repassword: '111111'
                })
                .redirects()
                .end(function (err, res) {
                    res.text.should.containEql('用户名已被占用');
                    done(err)
                })
        });

        it('signup successful', function (done) {
            request.post('/signup')
                .send({
                    name: 'testname1',
                    password: '111111',
                    repassword: '111111'
                })
                .end(function (err, res) {
                    res.status.should.equal(302);
                    res.headers.location.should.equal('/');
                    done(err)
                })
        })
    })
});