const _ = require('lodash');
const Type = require('../../Type');
const Validators = require('./validators');


/**
 * Class Validator
 *
 * @author Helen Gotovska
 * @description Use for validate values
 * @example
 * var validator = new Validator(objectOfValues)
 *
 * validator
 *     .validate()
 *     .then(
 *         () => { console.log('success') },
 *         err => { console.log('errors', err) }
 *     )
 */
class Validator {

  constructor(attrs) {
    this.attrs = attrs || {};

    if (!(this.attrs instanceof Type)) {
      this.attrs = new Type(this.attrs);
    }
  }

  get fields() {
    return {};
  }

  async validate() {
    let errors = {};
    let keys = Object.keys(this.fields);

    for (let i = 0; keys[i]; i++) {
      let key = keys[i];
      let validators = this.fields[key];
      let valKeys = Object.keys(validators);

      for (let j = 0; valKeys[j]; j++) {
        let k = valKeys[j];
        let v = validators[k];
        let fn;

        if (_.isFunction(v)) {
          fn = v;
        } else if (_.isFunction(Validators[k])) {
          fn = Validators[k];
        } else {
          break;
        }

        if (k === 'confirm') {
          try {
            await fn(this.attrs.get(key), this.attrs.get(v), this.attrs);
          } catch (err) {
            if (!errors[key]) {
              errors[key] = [];
            }

            errors[key].push(err);
          }
        } else {
          try {
            await fn(this.attrs.get(key), v, this.attrs);
          } catch (err) {
            if (!errors[key]) {
              errors[key] = [];
            }

            errors[key].push(err);
          }
        }
      }
    }

    Object.defineProperty(errors, 'statusCode', {
      value: function() {
        return 400;
      },
      configurable: true,
      writable: true
    });

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      throw errors;
    }
  }

}

module.exports = Validator;
