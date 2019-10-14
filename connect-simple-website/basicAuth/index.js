var connect = require('connect')
var server = connect.createServer()


process.stdin.resume();
process.stdin.setEncoding('ascii');

server.use(connect.basicAuth(function(user, pass, fn) {
    process.stdout.write(`Allow user ${user} with pass ${pass} [y/n]:`);
    process.stdin.once('data', function(data) {
        if (data[0] == 'y') {
            fn(null, {username: user})
        } else {
            fn(new Error('Unauthorized!'))
        }
    })
}))

server.use(function(req, res, next) {
    if ('/' == req.url) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello ' + req.remoteUser.username);
    } else { 
        next()
    }
})

server.listen(3000)