const _inter = require('lodash.intersection');
const _keys = require('lodash.keys');
const _pick = require('lodash.pick');

module.exports = {
  checkInit: (req, res, next, fields, name) => {
    if (_inter(_keys(req.body), fields).length === fields.length) {
      req.body = _pick(req.body, fields);
      next();
    } else {
      res.status(400).json({ error: `Invalid${name}` });
    }
  },
  checkUpdate: (req, res, next, fields, name) => {
    if (_inter(_keys(req.body), fields).length > 0) {
      req.body = _pick(req.body, fields);
      next();
    } else {
      res.status(400).json({ error: `Invalid${name}` });
    }
  },
};
