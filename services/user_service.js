const User = require('../models/in_memo/user');

function getAllUsers() {
  const user = User.list();
  return user;
}

function addNewUser(firstName, lastName, age) {
  const user = User.insert(firstName, lastName, age);
  return user;
}


module.exports = {
  getAllUsers,
  addNewUser
};