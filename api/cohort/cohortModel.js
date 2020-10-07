const db = require('../../data/db-config');

const add = (cohort) => {
  return db('Cohorts').insert(cohort).returning('ID');
};

module.exports = {
  add,
};
