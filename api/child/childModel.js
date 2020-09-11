const db = require('../../data/db-config');

/**
 *
 */
const findAll = () => {
  return db('Children');
};

/**
 *
 * @param {*} ID
 */
const findById = (ID) => {
  return db('Children').where({ ID });
};

/**
 *
 * @param {*} child
 */
const add = (child) => {
  return db('Children').insert(child).returning('ID');
};

/**
 *
 * @param {*} ID
 * @param {*} changes
 */
const update = (ID, changes) => {
  return db('Children').where({ ID }).update(changes);
};

/**
 *
 * @param {*} ID
 */
const remove = (ID) => {
  return db('Children').where({ ID }).del();
};

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
