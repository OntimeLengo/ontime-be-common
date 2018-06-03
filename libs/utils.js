module.exports = {

  format: function(s, c) {
    return s.replace(/{{\s(\w+)\s}}/g, function(m, p) {
      return c[p];
    });
  },

  addZero: function(i) {
    if (i < 10) {
      return '' + '0' + i.toString();
    } else {
      return i.toString();
    }
  },

  convertFormat: function(old) {
    let format = old;
    let mappper = {
      '%d': 'DD',
      '%m': 'MM',
      '%Y': 'YYYY',
      '%H': 'HH',
      '%i': 'mm',
      '%s': 'ss'
    };

    _.forEach(mappper, _.bind(function(v, k) {
      format = this.replaceAll(format, k, v);
    }, this));

    return format;
  },

  dateFormat: function(date, format) {
    /*
     * d - day
     * m - month
     * Y - year
     * H - hours
     * i - minutes
     * s - seconds
     */
    let keys = {
      '%d': date.getDate(),
      '%m': date.getMonth() + 1,
      '%Y': date.getFullYear(),
      '%H': date.getHours(),
      '%i': date.getMinutes(),
      '%s': date.getSeconds()
    };

    ['%d', '%m', '%Y', '%H', '%i', '%s'].forEach(_.bind(function(k) {
      format = this.replaceAll(format, k, this.addZero(keys[k]));
    }, this));

    return format;
  },

  splitCamelCase: function(s) {
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },

  copy: function(obj) {
    let new_obj = {};

    _.forEach(obj, _.bind(function(k, v) {
      if (k != '_id') {
        if (v && typeof v == 'object' && typeof v.copy != 'undefined') {
          new_obj[k] = this.copy(v);
        } else {
          new_obj[k] = v;
        }
      }
    }, this));

    return new_obj;
  },

  capitalize: function(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  },

  splitCapitalize: function(s, spliter) {
    let data, i;

    spliter = spliter || '-';
    data = s.split(spliter);

    for (i = 0; i < data[i]; i++) {
      data[i] = this.capitalize(data[i]);
    }

    return data.join('');
  },

  empty: function() {
    return function() {};
  }

};
