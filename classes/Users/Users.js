const EventEmitter = require('events');
const User = require('./User');

/**
 * Class Users
 *
 * @author Helen Gotovska
 */
class Users extends EventEmitter {

  /**
   * @constructor
   */
  constructor(users = []) {
    super();

    this._users = new Map();

    users.forEach(user => this._users.set(user.id, new User(user)));
  }

  get(id) {
    return this._users.get(id);
  }

  list() {
    return Array.from(this._users.values());
  }

}


module.exports = Users;
