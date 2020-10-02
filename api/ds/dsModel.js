const db = require('../../data/db-config');

const setComplexity = (ID, Complexity) => {
  return db('Submissions').where({ ID }).update({ Complexity });
};

const getComplexitiesByChild = (ChildID) => {
  return db('Submissions')
    .where({ ChildID })
    .orderBy('ID', 'desc')
    .select(['ID', 'Complexity']);
};

module.exports = {
  setComplexity,
  getComplexitiesByChild,
};
