const express = require('express');

const router = express.Router();

const logger = require('../utils/loggers/logger');

router.get('/', (req, res, next) => {
  logger.info(`url:${req.baseUrl} || ${req.ip} || 查看了about页面`);
  //res.json({msg: 'hello'});
  res.render('signup', {title: '注册'});
});

module.exports = router;