const winston = require('winston');
const maxsize = 1024 * 1024 * 10;
const maxFiles = 10;

let logger;

logger = new (winston.Logger)({

  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },

  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'gray'
  },

  transports: [
    new (winston.transports.Console)({
      level: 'info',
      timestamp: true,
      json: false,
      colorize: true,
      prettyPrint: true,
      silent: false
    }),
    new (winston.transports.File)({
      name: 'error',
      level: 'error',
      filename: 'logs/error.log',
      timestamp: true,
      json: false,
      prettyPrint: true,
      silent: false,
      maxFiles: maxFiles,
      maxsize: maxsize
    }),
    new (winston.transports.File)({
      name: 'warn',
      level: 'warn',
      filename: 'logs/warn.log',
      timestamp: true,
      json: false,
      prettyPrint: true,
      silent: false,
      maxFiles: maxFiles,
      maxsize: maxsize
    }),
    new (winston.transports.File)({
      name: 'info',
      level: 'info',
      filename: 'logs/info.log',
      timestamp: true,
      json: false,
      prettyPrint: true,
      silent: false,
      maxFiles: maxFiles,
      maxsize: maxsize
    })
  ],

  exitOnError: false

});

module.exports = logger;
