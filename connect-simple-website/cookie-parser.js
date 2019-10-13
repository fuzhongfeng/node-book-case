var connect = require('connect')
var server = connect.createServer()
var fs = require('fs')

server.use(connect.cookieParser())

server.use(function(req, res, next) {
    if (req.method === 'GET' && req.url === '/') {
        console.log(req.cookies)
        serve(res, __dirname + '/input.html', 'text/html')
    } else {
        next()
    }
})

function serve(res, path, type) {
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(path).pipe(res)
}

server.listen(3000)
