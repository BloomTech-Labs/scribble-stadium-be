const _inter = require('lodash.intersection');
const _keys = require('lodash.keys');

module.exports = {
  checkInit: (req, res, next, fields, name) => {
    if (_inter(_keys(req.body), fields).length === fields.length) {
      next();
    } else {
      res.status(400).json({ error: `Invalid${name}` });
    }
  },
  checkUpdate: (req, res, next, fields, name) => {
    if (_inter(_keys(req.body), fields).length > 0) {
      next();
    } else {
      res.status(400).json({ error: `Invalid${name}` });
    }
  },
};
