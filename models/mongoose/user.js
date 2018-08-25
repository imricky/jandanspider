const mongoose = require('mongoose');
const {Schema} = mongoose;

const logger = require('../../utils/loggers/logger');



const userSchema = new Schema({
  name: {type: String, requied: true, index: 1},
  age: {type: Number, min: 0, max: 120},
  password: {type:String,requied: true},
  info:{type:String},
  mail:{type:String,requied:true},
  insert_time:{type:Date,requied:true},
  update_time:{type:Date}
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
//获取注册时自增的userno的值（mongodb好像不建议这么做，直接用系统objectid好了）
// async function getMaxUserno() {
//   let user = await UserModel.findOne({name});
//   return user;
// }



module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
};


