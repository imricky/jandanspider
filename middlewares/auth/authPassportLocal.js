const passport = require('passport')
const LocalStrategy = require('passport-local')
const crypto = require('crypto')
const User = require('../../models/mongoose/user')
const bluebird = require('bluebird')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)
const logger = require('../../utils/loggers/logger')

async function validPassword(password, resPassword, username) {
  logger.info(`${username}调用了密码验证`)
  const cipher = await pbkdf2Async(password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
  return resPassword === cipher.toString('hex')
}

// 用户名密码验证策略

passport.use(new LocalStrategy(
    /**

     * @param username 用户输入的用户名

     * @param password 用户输入的密码

     * @param done 验证验证完成后的回调函数，由passport调用

     */

    (username, password, done) => {
      (async () => {
        return await User.UserMethods.getOneByName(username)
      })()
          .then(r => {
            if (r === null || r === "" || r === void 0) {
              return done(null, false, {message: '用户不存在'})
            }
            const resUsername = r.name
            const resPassword = r.password
            if (resUsername === void 0 || resPassword === void 0) {
              return done(null, false, {message: '用户不存在'})
            }
            validPassword(password, resPassword, username).then(validRes => {
              if (!validRes) {
                return done(null, false, {message: '密码错误'})
              } else {
                return done(null, r)
              }
            }).catch(e => {
              logger.error(e)
            })

          })
          .catch(e => {
            logger.error(e)
          })
    }
))

// serializeUser 用户登录验证成功以后将会把用户的数据存储到 session 中

passport.serializeUser((user, done) => {

  done(null, user)

})

// deserializeUser 每次请求的时将从 session 中读取用户对象，并将其封装到 req.user

passport.deserializeUser((user, done) => {

  return done(null, user)

})

// 这是封装了一个中间件函数到 passport 中，可以在需要拦截未验证的用户的请求的时候调用

passport.authenticateMiddleware = () => {

  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    console.log(req.user);
    // res.redirect('/user/login');
    logger.info(`访问了${req.baseUrl}`)
    res.status(403).send('非法访问')
    // res.locals = {title:'404',username: ''}
    // res.render('index');

  }

}

module.exports = passport