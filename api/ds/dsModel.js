const db = require('../../data/db-config');

const setComplexity = (ID, Complexity) => {
  return db('Submissions').where({ ID }).update({ Complexity });
};

module.exports = {
  setComplexity,
};
