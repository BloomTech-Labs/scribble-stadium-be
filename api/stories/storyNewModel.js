const db = require('../../data/db-config');

/**
 * Queries the database to attempt to add a new story
 * @param {Object} story the story to be added to the database
 * @param {string} story.Title the title of the story
 * @param {string} story.Description the description of the story
 * @param {string} story.Author the author of the story
 * @returns {Promise} a promise that resolves to the ID of the new story
 */
const add = (story) => {
  return db('Stories-New').insert(story).returning('ID');
};

/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the given story ID
 */
const getById = (ID) => {
  return db('Stories-New').where({ ID });
};

const update = (ID, changes) => {
  return db('Stories-New').where({ ID }).update(changes);
};

const remove = (ID) => {
  return db('Stories-New').where({ ID }).del();
};

const getEpisodesByStoryID = (storyID) => {
  return db('Episodes as e')
    .join('Stories-New as s', 'e.StoryID', 's.ID')
    .where('s.ID', storyID)
    .select('e.ID', 'e.StoryID', 'e.EpisodeNumber', 'e.TextURL', 'e.AudioURL');
};

const getEpisodeByID = (storyID, episodeID) => {
  return db('Episodes as e')
    .where('e.StoryID', storyID)
    .andWhere('e.ID', episodeID)
    .join('Stories-New as s', 'e.StoryID', 's.ID')
    .select('e.ID', 'e.StoryID', 'e.EpisodeNumber', 'e.TextURL', 'e.AudioURL');
};

const addEpisode = (storyID, episode) => {
  return db('Episodes as e')
    .where('e.StoryID', storyID)
    .insert(episode)
    .returning('ID');
};

const updateEpisode = (storyID, episodeID, changes) => {
  return db('Episodes as e')
    .where('e.StoryID', storyID)
    .andWhere('e.ID', episodeID)
    .join('Stories-New as s', 'e.StoryID', 's.ID')
    .update(changes);
};

const removeEpisode = (storyID, episodeID) => {
  return db('Episodes as e')
    .where('e.StoryID', storyID)
    .andWhere('e.ID', episodeID)
    .join('Stories-New as s', 'e.StoryID', 's.ID')
    .del();
};

module.exports = {
  add,
  getById,
  update,
  remove,
  getEpisodesByStoryID,
  getEpisodeByID,
  addEpisode,
  removeEpisode,
  updateEpisode,
};
