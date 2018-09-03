const createError = require('http-errors')
const express = require('express')
const path = require('path')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) //保存session到MongoDB
// const logger = require('morgan');
require('./services/mongodb_connection')
const errHandler = require('./middlewares/http_error_handle')

const logger = require('./utils/loggers/logger') //日志相关


const indexRouter = require('./routes/index') //主页面
const usersRouter = require('./routes/api/users') //用户管理页面
const loginRouter = require('./routes/api/login') //注册页面
const logoutRouter = require('./routes/api/logout') //注销api
const registerRouter = require('./routes/api/register') //登录页面
const aboutRouter = require('./routes/about') //关于页面


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//app.use(cookieParser());
app.use(session({
  //name: 'ricky', //设置 cookie 中，保存 session 的字段名称，默认为 connect.sid
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  //store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  store: new MongoStore({
    url: 'mongodb://localhost:27017/spider',
    //touchAfter: 24 * 3600 // time period in seconds
    //ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    //ttl: 10  如果session cookie 有过期时间，mongoStore会使用这个，否则会自己创建一个
    //Each time an user interacts with the server, its session expiration date is refreshed.
  }),

  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 100 * 1000  // 有效期，单位是毫秒/这个比较重要
  }
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())

//这里做拦截，可以监听到所有访问的url
// app.use('', (req, res, next) => {
//   logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`);
//   next();
// })

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

app.use('/about', aboutRouter)

//处理http请求相关的错误
app.use(errHandler())

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404))
// })

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  logger.error(err.stack)
  // console.log('您访问的资源不存在!');
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

process.on('uncaughtException', (err) => {

  logger.error('uncaught exception', {err})
})

process.on('unhandledReject', (reason, p) => {
  logger.error('unhandledRejection', {reason, p})
})

module.exports = app
