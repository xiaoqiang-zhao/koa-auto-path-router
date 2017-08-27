module.exports = function (ctx) {
    // do something
    ctx.body = {
        status: 0,
        statusInfo: 'AAA',
        data: {
            name: ctx.query.name
        }
    };
};