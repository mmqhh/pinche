var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var unless = require('express-unless')
var secretKey = "Hello Brohua"  //加密token


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressJWT({
    secret: secretKey
}).unless({ path: ['/api/login','/api/signup'] }));     // 不需要token验证的路由

app.use(function (err, req, res, next) {
    // if (err.name === "UnauthorizedError") {
    //   res.status(401).send("invalid token");
    // }
    var token = req.body.token || req.query.token || req.headers["token"];
    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            // 返回错误信息
            res.status(401).send({
                code: '50008',
                status: 'Invalid Token!',
                message: 'Failed to authenticate token. Make sure to include the ' +
                    'token returned from /users call in the authorization header ' +
                    ' as a Bearer token'
            });
            return;
        } else {
            // 跳出中间件
            return next();
        }
    })
});



app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports =  app 