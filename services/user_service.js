const User = require('../models/mongoose/user')
const HttpReqParamError = require('../errors/http_request_param')

async function getAllUsers() {
  const user = await User.UserMethods.list()
  return user
}

async function insertUser(user) {
  const created = await User.UserMethods.insert(user)
  return created
}

async function getOneById(userId) {
  const user = await User.UserMethods.getOneById(userId)
  return user
}

async function getOneByName(name) {
  // if(name.length >5){
  //   throw new HttpReqParamError(
  //       'name','name长度小于5',
  //       'name length less than 5'
  //   );
  // }
  const user = await User.UserMethods.getOneByName(name)
  return user
}


module.exports = {
  getAllUsers,
  insertUser,
  getOneById,
  getOneByName,
}