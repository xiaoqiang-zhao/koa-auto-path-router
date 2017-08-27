const Koa = require('koa');
const router = require('../index');
const app = new Koa();
// const koaAutoPathRouter = require('koa-auto-path-router');

app.use(router('./demo/mock/'));

app.listen(5000);
console.log('请测试: localhost:5000/a');