const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/myblog';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('open',()=>{
  console.log('open!! ')
});

module.exports = db;
