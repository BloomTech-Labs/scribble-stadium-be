const _inter = require('lodash.intersection');
const _keys = require('lodash.keys');

const fields = [
  'Name',
  'PIN',
  'ParentID',
  'AvatarID',
  'GradeLevelID',
  'IsDyslexic',
];
/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * is incorrectly formatted. If the data is correct, the server will move on to
 * the actual POST router.
 * @param {Object} req the server request object
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const childValidation = (req, res, next) => {
  // Pull the task sent in the request body
  const child = req.body;
  if (_inter(_keys(child), fields).length === fields.length) {
    // If it's valid, continue
    next();
  } else {
    // Otherwise, return a 400 w/ error message
    res.status(400).json({ error: 'InvalidChild' });
  }
};

/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * passed in doesn't contain any valid fields for Child data. If the data is
 * correct, the server will move on to the actual PUT router.
 * @param {Object} req the server request object
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const childUpdateValidation = (req, res, next) => {
  // pull the changes sent in the request body
  const changes = req.body;
  if (_inter(_keys(changes), fields).length > 0) {
    // If it contains at least one valid field
    next();
  } else {
    res.status(400).json({ error: 'InvalidChildChanges' });
  }
};

module.exports = {
  childValidation,
  childUpdateValidation,
};
