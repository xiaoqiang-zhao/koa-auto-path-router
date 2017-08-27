module.exports = function (ctx) {
    ctx.body = {
        status: 0,
        statusInfo: 'AAA',
        data: {
            name: ctx.request.body.name
        }
    };
};