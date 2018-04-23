const express = require('express');
const router = express.Router();

const logger = require('../../utils/loggers/logger');

//const JWT = require('jsonwebtoken');

const crypto = require('crypto');
const User = require('../../models/mongoose/user');
const bluebird = require('bluebird');
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);


router.post('/', (req, res, next) => {

  (async () => {
    const {name,age,password} = req.body;
    const cipher = await pbkdf2Async(password,'ashdjkaqkjwjehasd',10000,512,'sha256');
    //md5 = crypto.createHash('md5');

    //userPwd = md5.update(password).digest('hex');
    const created = await User.insert({name,age,password:cipher.toString('hex')});
    //res.redirect("../login");
    return created;
  })()
      .then(r => {
        logger.info('创建成功!');
        //res.redirect("../login");
        res.json('创建成功');
      })
      .catch(e => {
        next(e);
      });
});
module.exports = router;