const express = require('express');
const router = express.Router();

const logger = require('../../utils/loggers/logger');

const JWT = require('jsonwebtoken');

const crypto = require('crypto');
const User = require('../../models/mongoose/user');
const bluebird = require('bluebird');
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);


//jwt测试
router.post('/', (req, res, next) => {
  // logger.info(`url:${req.originalUrl} || ${req.ip}`);
  // res.set('set-Cookie', `username=${req.query.username}`);
  // res.send();

  (async () => {
    const {name,password}=req.body;
    const userRes = await User.getOneByName(name);
    if(userRes === null){
      res.send({login:false})
    }
    const resUsername = userRes.name;
    const resPassword = userRes.password;

    const cipher = await pbkdf2Async(password,'ashdjkaqkjwjehasd',10000,512,'sha256');
    //userPwd = crypto.createHash('md5').update(password).digest('hex');
    //用户名和数据库里取出的进行比较
    if(resUsername !== name || resPassword !== cipher.toString('hex')){
      logger.error('用户名或密码错误');
      res.send({login:false})
    }

    // res.cookie('islogin', resUsername, { maxAge: 60000 });
    // res.locals.username = resUsername;
    // req.session.username = res.locals.username;
    // console.log(req.session.username);
    //res.redirect('/');
    //return;
    res.send({login:true})
  })()
    .then(r => {
    })
    .catch(e => {
    });

  // const username=req.query.username;
  // const user = {username,expiredAt:Date.now().valueOf() + 20*60*1000};
  // const token = JWT.sign(user, 'qweqwwweqweqwe');
  // res.send(token);

});
router.post('/hello', (req, res, next) => {
  const auth = req.get('Authorization');
  if(!auth) res.send('no auth!!');
  if(auth.indexOf('Bearer ') === -1) res.send('no bearer auth!!');
  const token = auth.split('Bearer ')[1];
  const user = JWT.verify(token,'qweqwwweqweqwe');
  if(user.expiredAt < Date.now().valueOf()) res.send('no bearer auth!!');
  res.send(user);
});

module.exports = router;