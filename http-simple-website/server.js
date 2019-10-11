var http = require('http');
var fs = require('fs');

/**
 * 使用 http 创建一个简单的网站
 */
var server = http.createServer(function(req, res) {
    console.log(req)
    if (req.method === 'GET'  && '/images' === req.url.substr(0, 7) && req.url.substr(-4) === '.png') {
        fs.stat(__dirname + req.url, function(err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('Not Found');
                return
            }
            serve(__dirname + req.url, 'application/png');
        })
    } else if(req.method === 'GET' && req.url === '/') {
        serve(__dirname + '/index.html', 'text/html')
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }

    function serve(path, type) {
        // http response headers:
        // Connection: keep-alive
        // Content-Type: text/html
        // Date: Thu, 10 Oct 2019 14:07:46 GMT(国际标准时间？)
        // Transfer-Encoding: chunked(分块编码)
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(path).pipe(res)
        // HTTP相应对象是一个只写流。从文件创建出来的流是只读的。可以将文件系统流接（pipe）到HTTP响应流中。
        // 上一行代码为以下的简写：
        // fs.createReadStream(path).on('data', function() {
        //     res.write(data)
        // }).on('end', function() {
        //     res.end()
        // })
    }
});

server.listen(3000)