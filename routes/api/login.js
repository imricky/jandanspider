const express = require('express')
const router = express.Router()

const logger = require('../../utils/loggers/logger')

const JWT = require('jsonwebtoken')

const crypto = require('crypto')
const User = require('../../models/mongoose/user')
const bluebird = require('bluebird')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)

const session = require('express-session');
const notifier = require('node-notifier');

router.use((req,res,next) => {
  next();
})

router.post('/', (req, res, next) => {
  (async () => {
    const {username, password} = req.body
    const userRes = await User.UserMethods.getOneByName(username)
    if (userRes === null || userRes === "" || userRes === void 0) {
      logger.error(`用户名不存在`)
      logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`)
      res.json({
        status: false,
        login: false,
        err: "用户不存在"
      })
    }
    const resUsername = userRes.name
    const resPassword = userRes.password
    //比较密码是否正确,后端传过来的是md5 加密过的
    const cipher = await pbkdf2Async(password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
    if (resUsername !== username || resPassword !== cipher.toString('hex')) {
      logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`)
      logger.error('用户名或密码错误')
      res.json({
        status: false,
        login: false,
        err: "用户名或或密码错误"
      });
    }
    req.session.loginUser = resUsername;
    logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`)
    logger.info('登录成功');
    //res.redirect('/');
    res.json({
      status: true,
      login: true
    });
  })()
      .then(r => {
      })
      .catch(e => {
        logger.error(e);
        next(e)
      })
});


//jwt测试
router.post('/hello', (req, res, next) => {
  const auth = req.get('Authorization')
  if (!auth) res.send('no auth!!')
  if (auth.indexOf('Bearer ') === -1) res.send('no bearer auth!!')
  const token = auth.split('Bearer ')[1]
  const user = JWT.verify(token, 'qweqwwweqweqwe')
  if (user.expiredAt < Date.now().valueOf()) res.send('no bearer auth!!')
  res.send(user)
});

router.get('/test',(req,res,next) => {
  res.status(403).send();
});

//重定向例子
router.get('/test1',(req,res,next) => {
  // String
  //notifier.notify('Message');

// Object
  notifier.notify({
    title: 'My notification',
    message: '您没有权限，禁止访问哦'
  });
  res.sendStatus(403);

});


module.exports = router