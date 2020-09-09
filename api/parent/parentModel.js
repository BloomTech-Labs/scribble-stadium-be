const db = require('../../data/db-config');

const findAll = async () => {
  return await db('Parents');
};

const findById = async (ID) => {
  return await db('Parents').where({ ID });
};

const add = async (parent) => {
  return await db('Parents').insert(parent);
};

module.exports = {
  findAll,
  findById,
  add,
};
