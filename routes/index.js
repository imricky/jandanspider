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
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  let users = [{
    name:'q',
    age:1
  },{
    name:'w',
    age:2
  },{
    name:'e',
    age:3
  },{
    name:'r',
    age:4
  }];
  //res.locals 可以传变量过去，pm2 start .bin/www --watch  一定要加watch 去监控文件的变动
  //res.locals.testu = users;
  res.render('index', {title: 'Ricky的博客啊',users:users});
});

router.get('/login', (req, res, next) => {
  if(req.session.loginUser){
    const user=req.session.loginUser;
    //console.log(req.session);
    res.send('你好'+user+'，欢迎来到我的家园。');
    //res.redirect('/');

  }else{
    //res.send('你还没有登录，先登录下再试试！');
    res.render('login', {title: 'Express'});
  }

  logger.info(`url:${req.baseUrl} || ${req.ip}`);
  //res.render('login', {title: 'Express'});
});

router.get('/register', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.render('register', {title: '注册页面'});
});

module.exports = router;
