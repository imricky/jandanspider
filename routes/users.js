const express = require('express');

const router = express.Router();

const UserService = require('../services/user_service');
const HTTPReqParamError = require('../errors/http_request_param');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers();
    res.locals.users = users;
    //return users;
  })()
      .then(r => {
        res.render('users');
      })
      .catch(e => {
        next(e)
      });
});

router.post('/', (req, res, next) => {

  (async () => {
    const {name, age} = req.body;

      const result = await UserService.addNewUser({
        name,
        age
      });
    return result;
  })()
      .then(r => {
        console.log(r);
        console.log('插入成功!')
        res.json(r);
      })
      .catch(e => {
        //throw new Error(e); //这里好像不能直接抛出错误，必须next到下一个才能捕获
        next(e)
      });
});

router.get('/:name', (req, res, next) => {
  (async () => {
    const {name} = req.params;
    const user = await UserService.getOneByName(name);
    return {
      user,
    };
  })()
      .then((r) => {
        //console.log(r.user.age);
        res.send(r);
      })
      .catch((e) => {
        next(e);
      });
});

module.exports = router;
