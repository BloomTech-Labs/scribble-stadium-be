const db = require('../../data/db-config');

/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the given story ID
 */
const getStoryByID = (ID) => {
  return db('Stories-New').where({ ID });
};

const getEpisodesByStoryID = (storyID) => {
  return db('Episodes as e')
  .join('Stories-New as s', 'e.StoryID', 's.ID')
  .where('s.ID', storyID)
  .select('e.StoryID', 'e.EpisodeNumber', 'e.TextURL', 'e.AudioURL')
}

module.exports = {
  getStoryByID,
  getEpisodesByStoryID
};
