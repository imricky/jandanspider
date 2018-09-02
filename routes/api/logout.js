const express = require('express')
const router = express.Router()

const logger = require('../../utils/loggers/logger')

router.get('/',(req,res,next) => {
  // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
  // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
  // 然后去查找对应的 session 文件，报错
  // session-file-store 本身的bug

  req.session.destroy(function(err) {
    if(err){
      res.json({
        logout:false,
        errMesssage:err,
        ret_code: 2,
        ret_msg: '退出登录失败'
      });
      return;
    }

    // req.session.loginUser = null;
    res.clearCookie();
    res.json({
      logout:true,

    })
    //res.redirect('/');
  });
})

module.exports = router;