const winston = require('winston');
require('winston-daily-rotate-file');
// //
// // // const {Logger,transports} = winston;
// // // const {Console,DailyRotateFile} = transports;
// //
// // // const logger = new Logger({
// // //   transport:[
// // //       new Console(),
// // //       new DailyRotateFile({
// // //         name:'base_logger',
// // //         filename: './logs/info.log',
// // //         datePattern: 'YYYY-MM-DD',
// // //         //zippedArchive: true,
// // //         prepend:false,
// // //         maxSize: '20m',
// // //         maxFiles: '14d',
// // //         level: 'info'
// // //       }),
// // //     new DailyRotateFile({
// // //       name:'error_logger',
// // //       filename: './logs/error.log',
// // //       datePattern: 'YYYY-MM-DD',
// // //       //zippedArchive: true,
// // //       prepend:false,
// // //       maxSize: '20m',
// // //       maxFiles: '14d',
// // //       level: 'error'
// // //     }),
// // //   ]
// // // });
const logger = new winston.Logger({
  //level: 'info',
  transports: [
    new (winston.transports.Console)(),
    // new (winston.transports.File)({ filename: 'somefile.log' }),
    new (winston.transports.DailyRotateFile)({
      name:'info',
      //filename: '../logs/info.log',
      filename: './logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      //  prepend: true,
      //zippedArchive: true,
      level:'info'
    }),
    new (winston.transports.DailyRotateFile)({
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      //  prepend: true,
      //zippedArchive: true,
      level:'error'
    }),

  ]
});
//
// logger.info('test info');
// logger.error('oops!!!')
module.exports = logger;










//
// const winston = require('winston');
// require('winston-daily-rotate-file');
// const logger = new winston.Logger({
//   level: 'info',
//   transports: [
//     new (winston.transports.Console)(),
//     // new (winston.transports.File)({ filename: 'somefile.log' }),
//     new (winston.transports.DailyRotateFile)({
//       filename: '../logs/',
//       datePattern: 'YYYY-MM-DD-HH',
//       //  prepend: true,
//       //zippedArchive: true,
//       level:'info'
//     })
//
//   ]
// });
//
// logger.info('it is my 2 log')
// logger.error('oops')