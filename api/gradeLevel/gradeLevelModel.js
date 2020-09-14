const db = require('../../data/db-config');

/**
 * Queries the database for a list of grade levels.
 * @returns {Promise} a promise that resolves to a list of grade level objects
 */
const getAll = () => {
  return db('GradeLevels');
};

/**
 * Attempts to add a new grade level to the database
 * @param {Object} gradeLevel the gradeLevel object to add to the database
 * @param {string} gradeLevel.GradeLevel a string of the grade level
 * @returns {Promise} promise that resolves to the ID of the newly created grade level
 */
const add = (gradeLevel) => {
  return db('GradeLevels').insert(gradeLevel).returning('ID');
};

module.exports = {
  getAll,
  add,
};
