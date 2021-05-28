const db = require('../../data/db-config');

const getAll = () => {
  return db('Children AS C').select(['C.ID', 'C.Name', 'C.Streaks']);
};

const getById = (ID) => {
  return db('Children AS C')
    .where('C.ID', ID)
    .select(['C.ID', 'C.Name', 'C.Streaks']);
};

const update = (ID, changes) => {
  return db('Children').where({ ID }).update(changes);
};

module.exports = {
  getAll,
  getById,
  update,
};
