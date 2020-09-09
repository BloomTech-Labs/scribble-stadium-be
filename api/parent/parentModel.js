const db = require('../../data/db-config');

const findAll = () => {
  return db('Parents');
};

const findById = (ID) => {
  return db('Parents').where({ ID });
};

const add = (parent) => {
  return db('Parents').insert(parent).returning('ID');
};

const update = (ID, changes) => {
  return db('Parents').where({ ID }).update(changes);
};

const remove = (ID) => {
  return db('Parents').where({ ID }).del();
};

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
