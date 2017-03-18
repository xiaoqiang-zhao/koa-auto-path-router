const http = require('http');
const Koa = require('koa');
const router = require('../index')
const expect = require('chai').expect;
const should = require('should');
// 测试 request 的利器
var request = require('supertest');

describe('test for koa auto path router', function () {
    var app = new Koa();
    it('initialize router with koa app', function(done) {
        app.use(router('./test/mock/'));
        done();
    });

    it('common get, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .get('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });

    });

});