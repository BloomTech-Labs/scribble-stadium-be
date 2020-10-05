const { checkInit, checkUpdate } = require('../../lib/validationCheckers');

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
const childValidation = (...r) => {
  checkInit(...r, fields, 'Child');
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
const childUpdateValidation = (...r) => {
  // pull the changes sent in the request body
  checkUpdate(...r, fields, 'Child');
};

module.exports = {
  childValidation,
  childUpdateValidation,
};
