const express = require('express');

const router = express.Router();

const logger = require('../utils/loggers/logger');

/* GET home page. */
router.get('/', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.render('index', {title: 'Express'});
});

router.get('/login', (req, res, next) => {
  logger.info(`url:${req.originalUrl} || ${req.ip}`);
  res.set('set-Cookie', `username=${req.query.username}`);
  res.send();
});
router.get('/hello', (req, res, next) => {
  if (req.cookies.username) {
    res.send(`<h1>${req.cookies.username}</h1>`)
  }
});



module.exports = router;
