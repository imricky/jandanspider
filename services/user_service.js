const User = require('../models/mongoose/user');

async function getAllUsers() {
  const user = await User.list();
  return user;
}

async function addNewUser(user) {
  const created = await User.insert(user);
  return created;
}

async function getOneById(userId) {
  const user = await User.getOneById(userId);
  return user;
}

async function getOneByName(name) {
  const user = await User.getOneByName(name);
  return user;
}


module.exports = {
  getAllUsers,
  addNewUser,
  getOneById,
  getOneByName,
};