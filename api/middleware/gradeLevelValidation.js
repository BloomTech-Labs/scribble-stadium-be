const _has = require('lodash.has');

/**
 * Checks if a given grade level object is valid
 * @param {Object} gradeLevel the grade level object to check the validity of
 * @returns {boolean} simple true or false
 */
const isValidGradeLevel = (gradeLevel) => {
  return _has(gradeLevel, 'GradeLevel');
};

/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * is incorrectly formatted. If the data is correct, the server will move on to
 * the actual POST router.
 * @param {Object} req the server request object
 * @param {Object} req.body can either be a single object or an array of objects
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const gradeLevelValidation = (req, res, next) => {
  const { body } = req;
  if (Array.isArray(body)) {
    // if request is an array of avatars
    body.forEach((gradeLevel) => {
      // check each avatar and resolve the request to an error if any are invalid
      if (!isValidGradeLevel(gradeLevel)) {
        return res.status(400).json({ error: 'InvalidGradeLevel' });
      }
    });
  } else {
    if (!isValidGradeLevel(body)) {
      return res.status(400).json({ error: 'InvalidGradeLevel' });
    }
  }
  // if it passes all tests, continue to the next middleware
  next();
};

module.exports = {
  gradeLevelValidation,
};
