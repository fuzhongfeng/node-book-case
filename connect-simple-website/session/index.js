var connect = require('connect')
// var RedisStore = require('connect-redis')(connect) // 版本问题调用出错
var users = require('./users')

 const server = connect(
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret: "my app secret"}),
    function(req, res, next) {
        console.log(req.session) 
        // {
        //     lastAccess: 1571022189961,
        //     cookie: { path: '/',
        //        httpOnly: true,
        //        _expires: 2019-10-14T07:03:05.431Z,
        //        originalMaxAge: 14400000 
        //     },
        //     logged_in: true,
        //     name: 'fuzhongfeng' 
        // }
        if ('/' == req.url && req.session.logged_in) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(
                `Welcome back, <b> ${req.session.name} </b>.<a href="/logout">Logout</a>`
            )
        } else {
            next();
        }
    },
    function(req, res, next) {
        if ('/' == req.url && 'GET' == req.method) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end([
                '<form action="/login" method="POST">',
                '<fieldset>',
                '<legend>Please log in</legend>',
                '<p>User: <input type="text" name="user"></input></p>',
                '<p>Password: <input type="password" name="password"></input><p>',
                '<button>Submit</button>',
                '<fieldset>',
                '</form>'
            ].join(''))
        } else {
            next()
        }
    },
    function(req, res, next) {
        if ('/login' == req.url && 'POST' == req.method) {
            res.writeHead(200);
            if (!users[req.body.user] || req.body.password != users[req.body.user].password) {
                res.end('Bad username/password')
            } else {
                req.session.logged_in = true;
                req.session.name = users[req.body.user].name;
                res.end('Authenticated!');
            }
        } else {
            next()
        }
    },
    function(req, res, next) {
        if('/logout' == req.url) {
            req.session.logged_in = false;
            res.writeHead(200);
            res.end('Logged out!');
        } else {
            next()
        }
    }
)
// 将session缓存到redis中可以在node程序重启后登录转台不过期
// server.use(connect.session({store: new RedisStore, secret: "my app secret"})) // 此处运行报错

server.listen(3000)