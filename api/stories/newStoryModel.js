const db = require('../../data/db-config');

const getStoryByID = (ID) => {
  return db('Stories-New AS S').where({ ID });
};

module.exports = {
  getStoryByID,
};
