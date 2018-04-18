const express = require('express');

const router = express.Router();

const UserService = require('../services/user_service')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const users = UserService.getAllUsers();
  //res.send('users');
  //res.json({name:'ricky',age:19})
  res.render('users', { users:users });
});

router.post('/', (req, res, next) => {
  const {firstName, lastName, age} = req.body;
  res.send(UserService.addNewUser(firstName,lastName,age));
});

module.exports = router;
