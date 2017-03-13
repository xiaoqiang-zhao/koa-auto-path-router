# koa-auto-path-router

 Koa auto path middleware, no need to write every router. The rule like this:

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

## License

  MIT
