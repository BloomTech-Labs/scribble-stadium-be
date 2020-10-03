const _inter = require('lodash.intersection');
const _keys = require('lodash.keys');

module.exports = {
  checkInit: (data, fields) =>
    _inter(_keys(data), fields).length === fields.length,
  checkUpdate: (data, fields) => _inter(_keys(data), fields).length > 0,
};
