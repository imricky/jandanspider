const express = require('express');

const router = express.Router();

const logger = require('../utils/loggers/logger');

const JWT = require('jsonwebtoken');

const crypto = require('crypto');
const User = require('../models/mongoose/user');
const bluebird = require('bluebird');
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);

/* GET home page. */
router.get('/', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`);
  //logger.info(`reqInfo:${reqInfo}`);
  //res.locals 可以传变量过去，pm2 start .bin/www --watch  一定要加watch 去监控文件的变动
  //res.locals.testu = users;
  console.log(`${req.cookie} || ${req.session}`)
  if(req.session.loginUser){
    const user=req.session.loginUser;
    //console.log(req.session);
    // res.send('你好'+user+'，欢迎来到我的家园。');
    res.locals = {title:'mainpage',username: user}

    res.render('index');
  }else{
    //res.send('你还没有登录，先登录下再试试！');
    res.locals = {title:'mainpage',username: ''}
    res.render('index');
  }
  //res.render('index', {title: '主页'});
});

router.get('/login', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`);
  if(req.session.loginUser){
    const user=req.session.loginUser;
    //console.log(req.session);
    res.send('你好'+user+'，欢迎来到我的家园。');
  }else{
    //res.send('你还没有登录，先登录下再试试！');
    res.render('login', {title: 'Express'});
  }

  //res.render('login', {title: 'Express'});
});

router.get('/register', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.render('register', {title: '注册页面'});
});

module.exports = router;


