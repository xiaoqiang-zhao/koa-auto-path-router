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

/**
 * auto path router from `root`.
 *
 * @param {String} root
 * @return {Function}
 * @api public
 */
function mock(root) {

    assert(root, 'root directory is required to serve files');

    const root = resolve(root);

    return async function (ctx, next) {
        const path = ctx.path;
        ctx.body = await getData ('/' + ctx.method + path);
        next();
    };

    function getData (path) {
        let body;
        const absolutePath = root + path + '/index.js';

        if(fs.existsSync(absolutePath)) {
            body = require(absolutePath)();
            delete require.cache[absolutePath];
        }
        else {
            body = 'can not find the path: ' + absolutePath;
        }

        return body;
    }
}