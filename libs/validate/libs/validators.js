/**
 * Function's list for validation values
 *
 * @author DmitryGo (Aries)
 */

const Utils = require('../../utils');
const gettext = require('../../gettext');
const errors = {
  req: 'This field is required',
  email: 'The value is not a valid email',
  url: 'URL is not valid',
  max: 'The value of more than {{ max }}',
  min: 'The value less than {{ min }}',
  maxLen: 'The value is longer than {{ max }} characters',
  minLen: 'The value is less than {{ min }} characters',
  confirm: 'Values do not match',
  regExp: 'The expression is not correct',
  gt: 'The value is less than or equal to {{ gt }}',
  ge: 'The value is less than {{ ge }}',
  lt: 'The value greater than or equal to {{ lt }}',
  le: 'The value of more than {{ le }}',
  list: 'Please select value',
  listSelect: 'Please select value',
  alphabet: 'You can only enter letters and numbers',
  all: 'An invalid character'
};

function Req(value) {
  if (typeof value === 'undefined' || typeof value === 'boolean' || value === null) {
    value = '';
  }

  if (typeof value === 'number' && value > 0) {
    return true;
  } else if (typeof value === 'string') {
    value = value.trim();

    if (value && value.length > 0) {
      return true;
    } else {
      throw new Error(gettext(errors.req));
    }
  } else {
    throw new Error(gettext(errors.req));
  }

  return true;
}

function Email(value) {
  let r = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (value === null || value === '') {
    return true;
  } else {
    if (value && value.length > 0 && r.test(value)) {
      return true;
    } else {
      throw new Error(gettext(errors.email));
    }
  }

  return true;
}

function Url(value) {
  let r = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (value === null) {
    return true;
  } else {
    if (value && value.length > 0 && r.test(value)) {
      return true;
    } else {
      throw new Error(gettext(errors.url));
    }
  }

  return true
}

function Max(value, max) {
  if (value === null) {
    return true;
  } else {
    if (value.toString().indexOf('.') >= 0) {
      value = parseFloat(value);
    } else {
      value = parseInt(value, 10);
    }

    if (max >= value) {
      return true;
    } else {
      throw new Error(Utils.format(gettext(errors.max), { max }));
    }
  }

  return true;
}

function Min(value, min) {
  if (value === null) {
    return true;
  } else {
    if (value.toString().indexOf('.') >= 0) {
      value = parseFloat(value);
    } else {
      value = parseInt(value, 10);
    }
    if (min <= value) {
      return true;
    } else {
      throw new Error(Utils.format(gettext(errors.min), { min }));
    }
  }

  return true;
}

function MaxLen(value, max) {
  if (value === null) {
    return true;
  } else {
    value = value.toString().trim();

    if (max >= value.length) {
      return true;
    } else {
      throw new Error(Utils.format(gettext(errors.maxLen), { max }));
    }
  }

  return true;
}

function MinLen(value, min) {
  if (value === null) {
    return true;
  } else {
    value = value.toString().trim();

    if (min <= value.length) {
      return true;
    } else {
      throw new Error(Utils.format(gettext(errors.minLen), { min }));
    }
  }

  return true;
}

function Reg(value, r) {
  r = RegExp(r);

  if (value === null) {
    return true;
  } else {
    if (r.test(value)) {
      return true;
    } else {
      throw new Error(gettext(errors.regExp));
    }
  }

  return true;
}

function Confirm(value, confirm) {
  if (value === confirm) {
    return true;
  } else {
    throw new Error(gettext(errors.confirm));
  }

  return true;
}

function Gt(value, gt) {
  value = parseInt(value, 10) || 0;

  if (value > gt) {
    return true;
  } else {
    throw new Error(Utils.format(gettext(errors.gt), { gt }));
  }

  return true;
}

function Ge(value, ge) {
  value = parseInt(value, 10) || 0;

  if (value >= ge) {
    return true;
  } else {
    throw new Error(Utils.format(gettext(errors.ge), { ge }));
  }

  return true;
}

function Lt(value, lt) {
  value = parseInt(value, 10) || 0;

  if (value < lt) {
    return true;
  } else {
    throw new Error(Utils.format(gettext(errors.lt), { lt }));
  }

  return true;
}

function Le(value, le) {
  value = parseInt(value, 10) || 0;

  if (value <= le) {
    return true;
  } else {
    throw new Error(Utils.format(gettext(errors.le), { le }));
  }

  return true;
}

function ListLen(value) {
  if (value.length > 0) {
    return true;
  } else {
    throw new Error(gettext(errors.list));
  }

  return true;
}

function ListSelect(value) {
  if (value.length > 0) {
    return true;
  } else {
    throw new Error(gettext(errors.listSelect));
  }

  return true;
}

function Alphabet(value) {
  let r = /^[a-zA-Z0-9\s_\-\.,\'"\%\#\$\(\)АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя].+$/;

  if (value === null || value === '') {
    return true;
  } else {
    if (r.test(value)) {
      return true;
    } else {
      throw new Error(gettext(errors.alphabet));
    }
  }

  return true;
}

function All(value) {
  let r = /^[^<>]+$/;

  if (value === null || value === '') {
    return true;
  } else {
    if (r.test(value)) {
      return true;
    } else {
      throw new Error(gettext(errors.all));
    }
  }

  return true;
}

module.exports = {
  req: Req,
  email: Email,
  url: Url,
  max: Max,
  min: Min,
  max_len: MaxLen,
  maxLen: MaxLen,
  min_len: MinLen,
  minLen: MinLen,
  confirm: Confirm,
  reg_exp: Reg,
  regExp: Reg,
  gt: Gt,
  ge: Ge,
  lt: Lt,
  le: Le,
  list: ListLen,
  listSelect: ListSelect,
  alphabet: Alphabet,
  all: All
};
