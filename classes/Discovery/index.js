const axios = require('axios');
const querystring = require('querystring');
const Abstract = require('../Abstract');
const logger = require('../../libs/logger');

/**
 * Class Discovery
 *
 * @author Helen Gotovska
 */
class Discovery extends Abstract {

  constructor(options) {
    super(options);

    this.name = null;
    this.host = null;
    this.port = null;

    this._host = null;

    this.isRegistered = false;
  }

  getDiscoveryHost() {
    if (!this._host) {
      this._host = 'http://' + this.options.host + ':' + this.options.port;
    }

    return this._host;
  }

  async register(name, host, port) {
    this.name = name;
    this.host = host;
    this.port = port;

    try {
      await axios.post(this.getDiscoveryHost() + '/register/' + name, { host, port });

      if (!this.isRegistered) {
        logger.info('Discovery/registered', name);
      }

      this.isRegistered = true;
    } catch (err) {
      this.isRegistered = false;

      logger.error('Discovery/register', err.message || err);

      setTimeout(async () => await this.register(name, host, port), 1000);

      return;
    }

    setTimeout(async () => await this.register(name, host, port), 3000);
  }

  async unregister() {
    try {
      await axios.delete(this.getDiscoveryHost() + '/register/' + this.name);
    } catch (err) {
      logger.error('Discovery/unregister', err.message || err);

      throw err;
    }
  }

  async hosts() {
    let response;

    try {
      response = await axios.get(this.getDiscoveryHost() + '/register');
    } catch (err) {
      logger.error('Discovery/hosts', err);

      throw err;
    }

    return response;
  }

  url(name, url = '', qs = {}) {
    let extraArgs = querystring.stringify(qs);

    if (extraArgs) {
      extraArgs = '?' + extraArgs;
    }

    return this.getDiscoveryHost() + '/api/' + name + url + extraArgs;
  }

}


module.exports = Discovery;
