const http = require('http');
const Koa = require('koa');
const router = require('../index');
const bodyParser = require('koa-bodyparser');

const expect = require('expect.js');
const should = require('should');
const request = require('supertest');

describe('test for koa auto path router', function () {
    var app = new Koa();
    it('initialize router with koa app', function(done) {
        app.use(bodyParser());
        app.use(router('./test/mock/'));
        done();
    });

    it('common GET method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .get('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET method request has params, url: /a?page=1&chinese-characters=汉字', function (done) {
        request(http.createServer(app.callback()))
            .get('/a?page=1&chinese-characters=汉字')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET method request has hash, url: /a#a/b', function (done) {
        request(http.createServer(app.callback()))
            .get('/a#a/b')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('POST method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .post('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('PUT method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .put('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('DELETE method request, url: /a', function (done) {
        request(http.createServer(app.callback()))
            .delete('/a')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

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

    it('query params in request of POST method', function (done) {
        request(http.createServer(app.callback()))
            .post('/ctx?name=123')
            .field('name', name)
            .expect(200)
            .end(function (err, res) {
                // console.log(res.body.data.name);
                /// expect(res.body.data.name).to.be(name);
                if (err) return done(err);
                done();
            });
    });
});