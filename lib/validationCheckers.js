const _inter = require('lodash.intersection');
const _keys = require('lodash.keys');
const _pick = require('lodash.pick');

/**
 * This function is meant to be used in validation checker middleware for POST requests
 * @param {Object} req the request object from the middleware
 * @param {Object} res the response object from the middleware
 * @param {Function} next the next() function from the middleware
 * @param {Array} fields an array of fieldnames that are expected for the data type
 * @param {String} name a singular string name of the data type
 */
const checkInit = (req, res, next, fields, name) => {
  if (_inter(_keys(req.body), fields).length === fields.length) {
    req.body = _pick(req.body, fields);
    next();
  } else {
    res.status(400).json({ error: `Invalid${name}` });
  }
};

/**
 * This function is meant to be used in validation checker middleware for PUT requests
 * @param {Object} req the request object from the middleware
 * @param {Object} res the response object from the middleware
 * @param {Function} next the next() function from the middleware
 * @param {Array} fields an array of fieldnames that are allowed for the data type
 * @param {String} name a singular string name of the data type
 */
const checkUpdate = (req, res, next, fields, name) => {
  if (_inter(_keys(req.body), fields).length > 0) {
    req.body = _pick(req.body, fields);
    next();
  } else {
    res.status(400).json({ error: `Invalid${name}` });
  }
};

module.exports = {
  checkInit,
  checkUpdate,
};
