const express = require('express');

const router = express.Router();

const logger = require('../utils/loggers/logger');

router.get('/', (req, res, next) => {
  logger.info('查看了about页面');
  //res.json({msg: 'hello'});
  res.render('about', {title: 'About'})
});

module.exports = router;