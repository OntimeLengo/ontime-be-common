const EventEmitter = require('events');
const querystring = require('querystring');
const axios = require('axios');
const logger = require('../libs/logger');
const Users = require('./Users');
const User = require('./Users/User');

/**
 * Class Abstract
 *
 * @author Helen Gotovska
 */
class Abstract extends EventEmitter {

  /**
   * @constructor
   */
  constructor(options) {
    options = options || {};

    super(options);

    this.options = options;
  }

  /**
   * @desctructor
   */
  destroy() {
    // redefine this method if you need functionality
  }

  getDiscovery() {
    throw new Err('Discovery not found. Please redefine this method.');
  }

  /**
   * Get Entity from DB
   *
   * You need to redefine this method
   */
  async getEntity() {
    return null;
  }

  /**
   * Set relation to users
   *
   * @param  {object Entity} entity Entity
   * @return {object Entity}
   */
  async joinUsers(entity) {
    let usersIds = new Set();
    let users;

    if (entity.creatorId) {
      usersIds.add(entity.creatorId);
    }

    if (entity.ownerId) {
      usersIds.add(entity.ownerId);
    }

    try {
      users = await this.getUsers([...usersIds]);
    } catch (err) {
      logger.error('Abstract/joinUsers', err);

      throw err;
    }

    if (entity.creatorId) {
      entity.Creator = users.get(entity.creatorId);
    }

    if (entity.ownerId) {
      entity.Owner = users.get(entity.ownerId);
    }

    return entity;
  }

  /**
   * Get information about user by ID
   *
   * @param  {string}  userId User ID
   * @return {object}
   */
  async getUser(userId, qs) {
    let url, response, user;

    url = this.getDiscovery().url('users', '/users/' + userId);

    if (qs) {
      url = url + '?' + querystring.stringify(qs);
    }

    try {
      response = await axios.get(url);

      user = response.data;
    } catch (err) {
      logger.error('Abstract/getUser', err);

      throw err;
    }

    return new User(user);
  }

  /**
   * Get information about users by IDS
   *
   * @param  {array}  userIds User IDS
   * @return {array}
   */
  async getUsers(ids = [], qs) {
    let users;

    if (ids.length > 0) {
      let url, response;

      url = this.getDiscovery().url('users', '/users/getbyids/' + ids.join(','));

      if (qs) {
        url = url + '?' + querystring.stringify(qs);
      }

      try {
        response = await axios.get(url);

        users = response.data;
      } catch (err) {
        logger.error('Abstract/getUsers', err);

        throw err;
      }
    }

    return new Users(users || []);
  }

}


module.exports = Abstract;
