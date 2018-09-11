function authSession(req,res,next) {
  //判断session里是否存在用户信息
    if(req.session.loginUser){
      next();
    }else {
      res.redirect('/');
    }
}
module.exports = authSession;

