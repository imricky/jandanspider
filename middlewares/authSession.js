const notifier = require('node-notifier');

function authSession(req,res,next) {
  //判断session里是否存在用户信息
    if(req.session.loginUser){
      next();
    }else {
      notifier.notify({
        title: 'My notification',
        message: '您没有权限，禁止访问',
        //title: void 0,
        subtitle: void 0,
        //message: void 0,
        sound: false, // Case Sensitive string for location of sound file, or use one of macOS' native sounds (see below)
        icon: 'Terminal Icon', // Absolute Path to Triggering Icon
        contentImage: void 0, // Absolute Path to Attached Image (Content Image)
        open: void 0, // URL to open on Click
        wait: false, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds

        // New in latest version. See `example/macInput.js` for usage
        timeout: 5, // Takes precedence over wait if both are defined.
        closeLabel: void 0, // String. Label for cancel button
        actions: void 0, // String | Array<String>. Action label or list of labels in case of dropdown
        dropdownLabel: void 0, // String. Label to be used if multiple actions
        reply: false // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.

      }
      // ,(error, response, metadata)=>{
      //   setTimeout(()=>{
      //     res.redirect('/');
      //   },100)
      // }
      );
      res.redirect('/');
    }
}
module.exports = authSession;


