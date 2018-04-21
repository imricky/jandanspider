const mongoose = require('mongoose');
const {Schema} = mongoose;

const logger = require('../../utils/loggers/logger');



const userSchema = new Schema({
  name: {type: String, requied: true, index: 1},
  age: {type: Number, min: 0, max: 120}
});

const UserModel = mongoose.model('user', userSchema);


async function insert(user) {

  const created = await UserModel.create(user);
  return created;
}

async function getOneById(id) {
  const user = await UserModel.findOne({_id: id});
  return user;
}

async function getOneByName(name) {
  const user = await UserModel.findOne({name});
  return user;
}

async function list(params) {
  const match = {};
  const flow = UserModel.find(match);
  const users = await flow.exec();
  logger.info('list all users');
  return users;
}


module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
};


