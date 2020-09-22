const db = require('../../data/db-config');

/**
 * Attempts to return an array of all valid avatars for children.
 * @returns {Promise} promise that resolves to an array of avatar objects
 */
const getAvatars = () => {
  return db('Avatars');
};

/**
 * Attempts to add a new avatar to the database.
 * @param {Object} avatar the avatar to add to the database
 * @param {string} avatar.AvatarURL the URL of the hosted SVG
 * @returns {Promise} promise that resolves to the ID of the new avatar
 */
const add = (avatars) => {
  return db('Avatars').insert(avatars).returning('ID');
};

module.exports = {
  getAvatars,
  add,
};
