# koa-auto-path-router

[中文文档](./Readme-ch.md)

Koa auto path middleware(just for Koa 2), no need to write every router. The rule like this:

GET `/a` -> `/GET/a/index.js`

POST `/a` -> `/POST/a/index.js`

## Installation

```bash
$ npm install koa-auto-path-router
```

## API

```js
const koa = require('koa');
const app = koa();
app.use(require('koa-auto-path-router')(root));
```

* `root` root directory string. nothing above this root directory can be served

## Example

```js
const koaAutoPathRouter = require('koa-auto-path-router');
const koa = require('koa');
const app = koa();

app.use(koaAutoPathRouter('./mock/'));
```

You can write the index.js like this:

```js
module.exports = function (ctx) {
  return {
      status: 0,
      statusInfo: 'AAA',
      data: {

      }
  };
};
```

and there has a param "ctx", you can write like this:

```js
module.exports = function (ctx) {
    // do something
    ctx.body = {
        status: 0,
        statusInfo: 'AAA',
        data: {
            // the query object from url
            name: ctx.query.name
        }
    };
};
```

if you want to do something for form data of post request, you need a package `koa-bodyparser`

```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-auto-path-router');
var app = new Koa();
app.use(bodyParser());
app.use(router('./mock'));
```

get the form data like this:

```js
module.exports = function (ctx) {
    // form data object
    ctx.request.body
};
```

## License

  MIT
