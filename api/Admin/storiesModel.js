const db = require('../../data/db-config');
// created beginning crud commands for the admin dashboard for Stories
<<<<<<< HEAD
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
=======
const getAll = () => {return db('Stories')};

const getById = (id) => {
    return db('Stories').where({id})
    
}

const update =( id, changes) => {
    return db('Stories')
        .where({id})
        .update(changes, '*')

}

const add = async (newStory) => {
   const [id] = await db('Stories')
        .insert(newStory)

 return getById(id)
}

const remove = (id) => {
    return db('Stories')
        .where({id})
        .del()
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}
>>>>>>> 8777a3727d45d7faf1b52483eec9f58ff24b8018
