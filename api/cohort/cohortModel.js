const db = require('../../data/db-config');

const getList = () => {
  return db('Cohorts');
};

const add = (cohort) => {
  return db('Cohorts').insert(cohort).returning('ID');
};

module.exports = {
  getList,
  add,
};
