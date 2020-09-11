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

const add = (child) => {
  return db('Children').insert(child).returning('ID');
};

module.exports = {
  findAll,
  findById,
  add,
};
