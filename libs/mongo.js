const mongoose = require ('mongoose');
const session = require('express-session');
const logger = require('./logger');
const MongoStore = require('connect-mongo')(session);
const mongoOptions = {
  server: {auto_reconnect: true}
};

mongoose.Promise = global.Promise;

function getDb(options) {
  let host = 'mongodb://' + options.host + ':' + options.port + '/' + options.name;
  let db;

  mongoose.connect(host, mongoOptions);

  db = mongoose.connection;

  db.on('error', err => {
    logger.error('MongoDB. Connection error', err);

    mongoose.disconnect();
  });

  db.once('open', () => logger.info('DB conection successful'));
  db.on('reconnected', () => logger.info('DB reconnected'));

  db.on('disconnected', () => {
    setTimeout(() => mongoose.connect(host, mongoOptions), 1000);
  });

  /**
   * Mongo session store
   */
  if (options.mongoSession) {
    mod.sessionParser = session({
      secret: options.sessionKey || '1234567890',
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: db,
        ttl: 365 * 24 * 60 * 60
      })
    });
  }

  return db;
}

const mod = {
  getDb: getDb,
  mongoose: mongoose,
  sessionParser: null
};

module.exports = mod;
