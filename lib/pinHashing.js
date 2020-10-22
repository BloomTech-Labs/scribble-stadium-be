const bc = require('bcryptjs');

const hashPin = (PIN) => bc.hashSync(PIN, process.env.BCRYPT_ROUNDS || 6);

module.exports = { hashPin };
