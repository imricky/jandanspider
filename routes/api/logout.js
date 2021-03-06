const express = require('express')
const router = express.Router()

const logger = require('../../utils/loggers/logger')

router.get('/', (req, res, next) => {
  // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
  // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
  // 然后去查找对应的 session 文件，报错
  // session-file-store 本身的bug
  let userName
  if (req.session.passport !== void 0) {
    userName = req.session.passport.user.name
  } else {
    userName = '没有用户'
  }
  //let userName = 'asd'
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
      res.json({
        logout: false,
        errMessage: err,
        ret_code: 2,
        ret_msg: '退出登录失败,请联系管理员'
      })
      return
    }
    // req.session.loginUser = null;
    res.clearCookie()
    logger.info(`${userName} 注销了系统`)
    res.json({
      logout: true,
      userName: userName
    })
    //res.redirect('/');
  })
})

module.exports = router