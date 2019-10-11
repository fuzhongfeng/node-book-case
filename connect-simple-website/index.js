var connect = require('connect')
var server = connect.createServer()
var fs = require('fs');

/**
 * 处理静态文件
 */
// server.use(connect.static(__dirname + '/website')) // 此方法暂时无法使用，可能是已废弃
console.log(__dirname) // 当前文件所在的目录，不包含文件名
console.log(process.cwd())
// console.log(__filename) // 表示正在执行的文件的文件名

/**
 * 中间件的使用
 */
server.use(connect.logger('dev'))

server.use(function(req, res, next) {
    next()
})

server.use(function(req, res, next) {
    if (req.method === 'GET'  && '/images' === req.url.substr(0, 7)) {
        fs.stat(__dirname + '/website/' + req.url, function(err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('Not Found');
                return
            }
            serve(res, __dirname + '/website/' + req.url, 'application/png');
        })
    } else {
        next()
    }
})

server.use(function(req, res, next) {
    if (req.method === 'GET' && req.url === '/') {
        serve(res, __dirname + '/website/index.html', 'text/html')
    } else {
        next()
    }
})

server.use(function(req, res, next) {
    res.writeHead(404);
    res.end('Not Found')
})

function serve(res, path, type) {
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(path).pipe(res)
}

/**
 * 监听
 */
server.listen(3000)
