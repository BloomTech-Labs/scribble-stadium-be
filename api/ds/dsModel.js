const db = require('../../data/db-config');

/**
 * Attempts to update the complexity score of a submission.
 * @param {number} ID the id of the submission to update
 * @param {number} Complexity an integer representation of the complexity of a written story
 * @returns {Promise} returns a promise that resolves to the number of rows updated
 */
const setComplexity = (ID, Complexity) => {
  return db('Submissions').where({ ID }).update({ Complexity });
};

module.exports = {
  setComplexity,
};
