var connect = require('connect')
var time = require('./request-time')

var server = connect.createServer()
server.use(connect.logger('dev'))

/**
 * 实现时间中间件
 */
server.use(time({timer: 500}))

/**
 * 快速响应
 */
server.use(function(req, res, next) {
    if (req.url === '/a') {
        res.writeHead(200);
        res.end('Fast!');
    } else {
        next()
    }
})

/**
 * 慢速响应
 */

 server.use(function(req, res, next) {
    if (req.url === '/b') {
        setTimeout(function() {
            res.writeHead(200)
            res.end('Slow!')
        }, 1000)
    } else {
        next()
    }
 })

 server.listen(3000)


