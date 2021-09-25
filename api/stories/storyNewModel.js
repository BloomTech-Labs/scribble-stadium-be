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

/**
 * Queries the database to update row matching ID with the given changes
 * @param {number} ID the unique row ID to update
 * @param {Object} changes an object containing the changes
 * @param {string} [changes.Title] new story title (optional)
 * @param {string} [changes.Description] the new description of the story (optional)
 * @param {string} [changes.Author] the new author of the story (optional)
 * @returns {Promise} a promise that resolves to number of rows updated
 */
const update = (ID, changes) => {
  return db('Stories-New').where({ ID }).update(changes);
};

/**
 * Queries the database to remove a row
 * @param {number} ID the ID of the row to delete
 * @returns {Promise} a promise that resolves to the number of rows deleted
 */
const remove = (ID) => {
  return db('Stories-New').where({ ID }).del();
};

/**
 * Queries the database to retrieve all episodesfor a specific story with given ID
 * @param {number} storyID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the given story ID
 */
const getEpisodesByStoryID = (storyID) => {
  return db('Episodes as e')
    .join('Stories-New as s', 'e.StoryID', 's.ID')
    .where('s.ID', storyID)
    .select('e.ID', 'e.StoryID', 'e.EpisodeNumber', 'e.TextURL', 'e.AudioURL');
};

/**
 * Queries the database for a specific episode with given ID
 * @param {number} episodeID the ID to search for in the database
 * @returns {Promise} a promise that resolves to episode object of the given story ID
 */
const getEpisodeByID = (episodeID) => {
  return db('Episodes as e')
    .where('e.ID', episodeID)
    .select('e.ID', 'e.StoryID', 'e.EpisodeNumber', 'e.TextURL', 'e.AudioURL');
};

/**
 * Queries the database for a specific writing prompt with given episode ID
 * @param {number} episodeID the ID to search for in the database
 * @returns {Promise} a promise that resolves to episode object of the given episode ID
 */
const getWritingByEpisodeID = (episodeID) => {
  return db('Story-Prompts as sp')
    .where('sp.EpisodeID', episodeID)
    .andWhere('sp.Type', 'Writing')
    .select('sp.Prompt');
};

/**
 * Queries the database for a specific drawing prompt with given episode ID
 * @param {number} episodeID the ID to search for in the database
 * @returns {Promise} a promise that resolves to drawing prompt object of the given episode ID
 */
const getDrawingByEpisodeID = (episodeID) => {
  return db('Story-Prompts as sp')
    .where('sp.EpisodeID', episodeID)
    .andWhere('sp.Type', 'Drawing')
    .select('sp.Prompt');
};

/**
 * Queries the database to attempt to add a new episode
 * @param {Object} episode the episode to be added to the database
 * @param {string} episode.StoryID the id of the story
 * @param {string} episode.EpisodeNumber episode number
 * @param {string} episode.TextURL text url of episode
 * @param {string} episode.AudioURL audio url of episode
 * @returns {Promise} a promise that resolves to the ID of the new episode
 */
const addEpisode = (episode) => {
  return db('Episodes').insert(episode).returning('ID');
};

/**
 * Queries the database to update row matching ID with the given changes
 * @param {number} episodeID the unique row ID to update
 * @param {Object} changes the episode to be added to the database
 * @param {string} changes.EpisodeNumber the description of the story
 * @param {string} changes.TextURL the author of the story
 * @param {string} changes.AudioURL the author of the story
 * @returns {Promise} a promise that resolves to the ID of the new story
 */
const updateEpisode = (episodeID, changes) => {
  return db('Episodes as e').where('e.ID', episodeID).update(changes);
};

/**
 * Queries the database to remove a row
 * @param {number} episodeID the ID of the row to delete
 * @returns {Promise} a promise that resolves to the number of rows deleted
 */
const removeEpisode = (episodeID) => {
  return db('Episodes as e').where('e.ID', episodeID).del();
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
  getWritingByEpisodeID,
  getDrawingByEpisodeID,
};
