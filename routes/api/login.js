const express = require('express');
const router = express.Router();

const logger = require('../../utils/loggers/logger');

const JWT = require('jsonwebtoken');

const crypto = require('crypto');
const User = require('../../models/mongoose/user');
const bluebird = require('bluebird');
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);

router.post('/', (req, res, next) => {

  (async () => {
    const {name,age,password} = req.body;
    const cipher = await pbkdf2Async(password,'ashdjkaqkjwjehasd',10000,512,'sha256');
    const created = await User.insert({name,age,password:cipher});
    return created;
  })()
      .then(r => {
        logger.info('创建成功!');
        res.json('创建成功');
      })
      .catch(e => {
        next(e);
      });
});



//jwt测试
router.post('/jwt', (req, res, next) => {
  // logger.info(`url:${req.originalUrl} || ${req.ip}`);
  // res.set('set-Cookie', `username=${req.query.username}`);
  // res.send();
  //const user = {username,expiredAt:Date.now().valueOf() + 20*60*1000};
  //const token = JWT.sign(user, 'qweqwwweqweqwe');
  //res.send(token);

});
router.post('/hello', (req, res, next) => {
  const auth = req.get('Authorization');
  if(!auth) res.send('no auth!!');
  if(auth.indexOf('Bearer ') === -1) res.send('no bearer auth!!');
  const token = auth.split('Bearer ')[1];
  const user = JWT.verify(token,'qweqwwweqweqwe');
  if(user.expiredAt < Date.now().valueOf()) res.send('no bearer auth!!');
  res.send(user);
  // if (req.cookies.username) {
  //   res.send(`<h1>${req.cookies.username}</h1>`)
  // }
});

module.exports = router;