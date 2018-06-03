const EventEmitter = require('events');

/**
 * Class User
 *
 * @author Helen Gotovska
 */
class User extends EventEmitter {

  /**
   * @constructor
   */
  constructor(user = {}) {
    super();

    Object.assign(this, user);
  }

}


module.exports = User;
