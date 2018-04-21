const winston = require('winston');
require('winston-daily-rotate-file');

const {Logger,transports} = winston;
const {Console,DailyRotateFile} = transports;

const logger = new Logger({
  transports:[
      new Console(),
      new DailyRotateFile({
        name:'base_logger',
        filename: './logs/info-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        //zippedArchive: true,
        prepend:false,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info'
      }),
    new DailyRotateFile({
      name:'error_logger',
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      //zippedArchive: true,
      prepend:false,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error'
    }),
  ]
});

module.exports = logger;
