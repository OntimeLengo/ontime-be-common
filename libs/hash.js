const crypto = require('crypto');

module.exports = (str, salt) => {
  let crt;

  if (salt) {
    crt = crypto.createHmac('md5', salt);
  } else {
    crt = crypto.createHash('md5');
  }

  return crt.update(str).digest('hex');
};
