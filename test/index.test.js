const http = require('http');
const Koa = require('koa');
const router = require('../index');
const bodyParser = require('koa-bodyparser');

const expect = require('expect.js');
const should = require('should');
const request = require('supertest');

// 测试自动化路由
describe('test for koa auto path router', function () {
    var app = new Koa();

    // 初始化路由
    it('initialize router with koa app', function(done) {
        app.use(bodyParser());
        app.use(router('./test/mock/'));
        done();
    });

    // 普通无参数 GET 请求测试
    it('common GET method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .get('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    // GET 请求，编码测试(汉字)
    it('GET method request has params, url: /a?page=1&chinese-characters=汉字', function (done) {
        request(http.createServer(app.callback()))
            .get('/a?page=1&chinese-characters=汉字')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    // 哈希路由 GET 参数测试
    it('GET method request has hash, url: /a#a/b', function (done) {
        request(http.createServer(app.callback()))
            .get('/a#a/b')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    // POST 请求测试
    it('POST method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .post('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    // PUT 请求测试
    it('PUT method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .put('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    // DELETE 请求测试
    it('DELETE method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .delete('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    // GET 请求参数有效性测试
    var name = 'ctx';
    it('query params in request of GET method', function (done) {
        request(http.createServer(app.callback()))
            .get('/ctx?name=' + name)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.data.name).to.be(name);
                if (err) return done(err);
                done();
            });
    });

    // 地址栏参数 POST 请求测试
    it('query params in request of POST method', function (done) {
        request(http.createServer(app.callback()))
            .post('/ctx?name=123')
            .field('name', name)
            .expect(200)
            .end(function (err) {
                if (err) return done(err);
                done();
            });
    });
});