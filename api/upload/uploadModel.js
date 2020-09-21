const db = require('../../data/db-config');

const addAvatar = (URL) => db('Avatars').insert(URL).returning('*');

module.exports = {
  addAvatar,
};
