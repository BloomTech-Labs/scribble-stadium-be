const db = require('../../data/db-config');

const getStoryByID = (ID) => {
  return db('Stories-New AS S').where({ ID }).select('*');
};

module.exports = {
  getStoryByID,
};
