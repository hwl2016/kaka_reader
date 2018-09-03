var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 路由
var routes = require('./routes');

// 初始化express
var app = express();
app.use(bodyParser.json({limit: '2000KB'}));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Powered-By', 'Express');
    next();
});

app.use('/', routes);

app.listen(3000);
