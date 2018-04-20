const express = require('express');

const router = express.Router();

const UserService = require('../services/user_service')

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers();
    return users;
  })()
      .then(r => {
        res.render('users', {users: r});
      })
      .catch(e => {
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
        console.log(e)
        res.send(e)
        //next(e);
      });
});

module.exports = router;
