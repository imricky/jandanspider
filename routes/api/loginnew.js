const express = require('express')
const router = express.Router()

const logger = require('../../utils/loggers/logger')

const JWT = require('jsonwebtoken')

const crypto = require('crypto')
const User = require('../../models/mongoose/user')
const bluebird = require('bluebird')
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2)

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


async function validPassword(password, resPassword, username) {
  logger.info(`${username} 调用了密码验证系统`)
  const cipher = await pbkdf2Async(password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
  return resPassword === cipher.toString('hex')
}

//
// passport.use(new LocalStrategy({
//       //passReqToCallback: true,
//     },
//     (username, password, done) => {
//       (async () => {
//         return await User.UserMethods.getOneByName(username)
//       })()
//           .then(r => {
//             if (r === null || r === "" || r === void 0) {
//               logger.info(`${username} 登录了系统`)
//               return done(null, false, {message: '用户不存在'})
//             }
//             const resUsername = r.name
//             const resPassword = r.password
//             if (resUsername === void 0 || resPassword === void 0) {
//               logger.info(`${resUsername} 用户不存在`)
//               return done(null, false, {message: '用户不存在'})
//             }
//             validPassword(password, resPassword, username).then(validRes => {
//               if (!validRes) {
//                 return done(null, false, {message: '密码错误'})
//               } else {
//                 return done(null, r)
//               }
//             }).catch(e => {
//               logger.error(e)
//             })
//
//           })
//           .catch(e => {
//             logger.error(e)
//           })
//     }
// ))
//
// router.post('/', (req, res, next) => {
//   const {username, password} = req.body
//
//   logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`)
//   if (!username) {
//     return res.status(422).json({
//       status: false,
//       login: false,
//       err: "username is required"
//     })
//   }
//
//   if (!password) {
//     return res.status(422).json({
//       status: false,
//       login: false,
//       err: "password is required"
//     })
//   }
//
//   return passport.authenticate('local', {session: true}, (err, passportUser, info) => {
//     if (err) {
//       logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`)
//       logger.error(err)
//       return next(err)
//     }
//
//     if (!passportUser) {
//       //一定要加return，不然会报错
//       return res.json({
//         status: false,
//         login: false,
//         errInfo: info,
//         userInfo: passportUser
//       })
//     }
//
//     req.session.loginUser = passportUser.name //把用户信息塞到session里去，就可以鉴权了
//     logger.info(`url:${req.originalUrl} || ip:${req.ip} || path:${req.path} || method:${req.method}`)
//     logger.info(`登录成功。用户名：${passportUser.name}`)
//     return res.json({
//       status: true,
//       login: true,
//       errInfo: `${info}`,
//       userInfo: passportUser,
//     })
//     //res.status(400).info;
//   })(req, res, next)
// })


module.exports = router

