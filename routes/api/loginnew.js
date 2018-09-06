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

async function validPassword(password, resPassword) {
  const cipher = await pbkdf2Async(password, 'ashdjkaqkjwjehasd', 10000, 512, 'sha256')
  return resPassword === cipher.toString('hex')
}


passport.use(new LocalStrategy(
    (username, password, done) => {
      (async () => {
        return await User.getOneByName(username)
      })()
          .then(r => {
            const resUsername = r.name
            const resPassword = r.password
            if (resUsername === void 0 || resPassword === void 0) {
              return done(null, false, {message: 'Incorrect username.'})
            }
            validPassword(password, resPassword).then(r=>{
              if(!r){
                return done(null, false, {message: 'Incorrect password.'})
              }
            })

            return done(null, r)
          })
          .catch(e => {
          })
    }
))

router.post('/', (req, res, next) => {
  const {username, password} = req.body

  if (!username) {
    res.status(422).json({
      status: false,
      login: false,
      err: "username is required"
    })
  }

  if (!password) {
    res.status(422).json({
      status: false,
      login: false,
      err: "password is required"
    })
  }

  return passport.authenticate('local', {session: true}, (err, passportUser, info) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {

      res.json({
        status: true,
        login: true,
        info: info,
        pass: passportUser
      })
    }
    res.json({
      status: false,
      login: false,
      info: info,
      pass: passportUser
    })

    //res.status(400).info;
  })(req, res, next)
})


module.exports = router

