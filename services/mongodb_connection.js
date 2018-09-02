const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/spider';
const logger = require('../utils/loggers/logger');
const notifier = require('node-notifier');

mongoose.connect(uri);

const db = mongoose.connection;

db.on('open',()=>{
  notifier.notify({
    title: '提示',
    message: '数据库连接已创建'
  });
  logger.info(`database is open || open time: ${Date()}`);
});

db.on("error", function (error) {
  logger.error(`数据库连接失败 || 失败时间: ${Date()}`);
});

module.exports = db;
