const db = require('../../data/db-config');
// created beginning crud commands for the admin dashboard for Stories
const getAll = () => {
  return db('Stories');
};

const getById = (id) => {
  return db('Stories').where({ id });
};

const update = (id, changes) => {
  return db('Stories').where({ id }).update(changes, '*');
};

const add = async (newStory) => {
  const [id] = await db('Stories').insert(newStory);

  return getById(id);
};

const remove = (id) => {
  return db('Stories').where({ id }).del();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
