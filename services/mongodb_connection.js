const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/spider';
const logger = require('../utils/loggers/logger');

mongoose.connect(uri);

const db = mongoose.connection;

db.on('open',()=>{
  logger.info('database is open');
  //console.log('open!! ')
});

db.on("error", function (error) {
  logger.error('数据库连接失败');
});

module.exports = db;
