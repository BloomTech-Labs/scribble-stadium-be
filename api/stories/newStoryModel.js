const db = require('../../data/db-config');

const getStoryByID = (ID) => {
  return db('Stories-New').where({ ID });
};

module.exports = {
  getStoryByID,
};
