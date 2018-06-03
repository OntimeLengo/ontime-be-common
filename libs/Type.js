const modelTypeConverter = {
  int: function(value) {
    return parseInt(value, 10);
  },
  integer: function(value) {
    return parseInt(value, 10);
  },
  number: function(value) {
    return parseFloat(parseFloat(value).toFixed(4));
  },
  string: function(value) {
    if (value === null) {
      value = '';
    }

    return value.toString();
  },
  str: function(value) {
    if (value === null) {
      value = '';
    }

    return value.toString();
  },
  date: function(value) {
    return value;
  },
  datetime: function(value) {
    return value;
  },
  time: function(value) {
    return value;
  },
  bool: function(value) {
    return (value) ? true : false;
  },
  boolean: function(value) {
    return (value) ? true : false;
  },
  object: function(value) {
    return (typeof value === 'object') ? value : {};
  },
  array: function(value) {
    return Array.isArray(value) ? value : [value];
  }
};


/**
 * Class Type
 *
 * @author DmitryGo (Aries)
 */
class Type {

  constructor(attrs) {
    this.attributes = {};

    Object.keys(attrs).forEach(k => this.set(k, attrs[k]));
  }

  set(name, value) {
    let t;

    if (this.fields && this.fields[name]) {
      t = this.fields[name];

      if (typeof t === 'function') {
        this.attributes[name] = t.call(this, value);
      } else if (modelTypeConverter[t]) {
        this.attributes[name] = modelTypeConverter[t].call(this, value);
      } else {
        this.attributes[name] = value;
      }
    }
  }

  get(name) {
    return this.attributes[name];
  }

  remove(name) {
    delete this.attributes[name];
  }

  toJSON() {
    return this.attributes;
  }

}


module.exports = Type;
