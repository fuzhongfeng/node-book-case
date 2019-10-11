/**
 * 请求时间中间件, 超时阈值默认100ms
 * @param {Object} options
 */

 module.exports = function(opts) {
    var time = opts.time || 100;

    return function(req, res, next) {
        var timer = setTimeout(function() {
            console.log('slow:', req.method, req.url)
        }, time)

        var end = res.end;
        res.end = function(chunk, encoding) {
            res.end = end
            res.end(chunk, encoding)
            clearTimeout(timer)
        }

        next()
    }
 }