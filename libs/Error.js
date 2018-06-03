/**
 * Class Application Error
 *
 * @author Helen Gotovska
 */
class CommonError extends Error {

  constructor(message, extra = {statusCode: 500}) {
    super(message);

    this.name = 'CommonError';
    this.message = message;
    this.extra = extra;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return this.message;
  }

  statusCode() {
    return this.extra.statusCode || 500;
  }

}

module.exports = CommonError;
