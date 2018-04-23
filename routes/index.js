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
  res.render('index', {title: 'Ricky的博客'});
});

router.get('/login', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.render('login', {title: 'Express'});
});

router.get('/register', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.render('register', {title: '注册页面'});
});



module.exports = router;
