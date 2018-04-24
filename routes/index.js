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
  // if(!req.cookies.username){
  //   res.redirect('/login');
  //   return;
  // }
  res.render('index', {title: 'Ricky的博客'});
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

  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  //res.render('login', {title: 'Express'});
});

router.get('/register', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.render('register', {title: '注册页面'});
});



module.exports = router;
