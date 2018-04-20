const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/myblog';
const logger = require('../utils/loggers/logger');

mongoose.connect(uri);

const db = mongoose.connection;

db.on('open',()=>{
  logger.info('database is open');
  //console.log('open!! ')
});

module.exports = db;
