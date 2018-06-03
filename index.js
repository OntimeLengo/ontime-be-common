const classes = require('./classes');
const libs = require('./libs');

global.Error = libs.Error;

module.exports = {
  classes,
  libs
};
