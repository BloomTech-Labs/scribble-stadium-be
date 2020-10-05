const { checkInit, checkUpdate } = require('../../lib/validationCheckers');

const fields = ['Name', 'Email', 'PIN'];

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
const parentValidation = (req, res, next) => {
  // Pull the task sent in the request body
  checkInit(req, res, next, fields, 'Parent');
};

/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * passed in doesn't contain any valid fields for Parent data. If the data is
 * correct, the server will move on to the actual PUT router.
 * @param {Object} req the server request object
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const parentUpdateValidation = (req, res, next) => {
  // pull the changes sent in the request body
  checkUpdate(req, res, next, fields, 'Parent');
};

module.exports = {
  parentValidation,
  parentUpdateValidation,
};
