var express = require('express')
// var search = require('./search.ejs')

var app = express.createServer();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false })

app.get('/', function(req, res) {
    res.render('index')
})

app.listen(3000)