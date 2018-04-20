const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./services/mongodb_connection');
const errHandler = require('./middlewares/http_error_handle');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//处理http请求相关的错误
app.use(errHandler());

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404))
// })

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('您访问的资源不存在!');
  // render the error page
  res.status(err.status || 500);
  res.render('error')
});

process.on('uncaughtException', (err) => {
  console.log(err);
  //logger.error('uncaught exception', { err });
});

process.on('unhandledReject', (reason, p) => {
  console.log(`${reason} ${p}`)
  //logger.error('unhandledRejection', { reason, p });
});

module.exports = app;
