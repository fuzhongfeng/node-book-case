// var http = require('http');

// http.createServer(function(req, res) {
//     res.writeHead(200);
//     res.end('Hello World');
// }).listen(3000);

var http = require('http');
var qs = require('querystring');

http.createServer(function(req, res) {
    var body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        res.writeHead(200);
        res.end('Done');
        console.log('\n got name \033[90m' + qs.parse(body).name + '\033[39m\n');
    })
}).listen(3000)
