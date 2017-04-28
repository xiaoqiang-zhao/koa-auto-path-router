'use strict';

/**
 * Module dependencies.
 */

const fs = require('fs');
const resolve = require('path').resolve;
const assert = require('assert');

/**
 * Expose `mock()`.
 */
module.exports = mock;

function getData(rootPath, path, ctx) {
    let body;
    const absolutePath = rootPath + path + '/index.js';

    if (fs.existsSync(absolutePath)) {
        try {
            body = require(absolutePath)(ctx);
            delete require.cache[absolutePath];
        }
        catch (e) {
            console.log(e);
        }

    }
    else {
        body = 'can not find the path: ' + absolutePath;
    }

    return body;
}

/**
 * auto path router from `root`.
 *
 * @param {String} root
 * @return {Function}
 * @api public
 */
function mock(rootPath) {

    assert(rootPath, 'root path directory is required to serve files');
    rootPath = resolve(rootPath);

    return async function (ctx, next) {
        const path = ctx.path;
        var body = await getData(rootPath, '/' + ctx.method + path, ctx);
        if (body) {
            ctx.body = body;
        }
        next();
    };
}