const db = require('../../data/db-config');

/**
 *
 */
const findAll = () => {
  return db('Children');
};

const findById = (ID) => {
  return db('Children').where({ ID });
};

module.exports = {
  findAll,
  findById,
};
