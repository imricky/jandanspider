const express = require('express');
const router = express.Router();

const logger = require('../../utils/loggers/logger');

//const JWT = require('jsonwebtoken');

const crypto = require('crypto');
const User = require('../../models/mongoose/user');
const bluebird = require('bluebird');
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);

router.post('/', (req, res, next) => {
  //md5 = crypto.createHash('md5');
  //userPwd = md5.update(password).digest('hex');
  (async () => {
    const {regName,regPassword,regMail,regInfo} = req.body;
    const cipher = await pbkdf2Async(regPassword,'ashdjkaqkjwjehasd',10000,512,'sha256');
    const insertData = {
      name:regName,
      mail:regMail,
      password:cipher.toString('hex'),
      info:regInfo,
      insert_time:new Date(),
    }

    //const created = await User.insert({regName,regMail,regInfo,password:cipher.toString('hex')});
    const created = await User.UserMethods.insert(insertData);
    //res.redirect("../login");
    return created;
  })()
      .then((r) => {
        console.log(r);
        logger.info('创建成功!');
        res.json({
          status:true,
          register:true,
          //username:name
        });
      })
      .catch(e => {
        logger.error('创建失败!'+ e);
        next(e);
      });
});
module.exports = router;