const db = require('../../data/db-config');

const getAll = () => {
  return db('GradeLevels');
};

const add = (gradeLevel) => {
  return db('GradeLevels').insert(gradeLevel).returning('ID');
};

module.exports = {
  getAll,
  add,
};
