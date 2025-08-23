const crypto = require('crypto');

const createHash = (string) => {
  return crypto.createHmac('sha256', process.env.HASH_SECRET).update(string).digest('hex')
}

module.exports = createHash;

