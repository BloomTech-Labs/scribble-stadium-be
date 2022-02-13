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
  return db('Stories').insert(story).returning('ID');
};

/**
 * Queries the database for all stories
 * @returns {Promise} a promise that resolves to an array of story
 * objects with corresponding episodes
 */
const getAllStories = async () => {
  const stories = await db('Stories');
  for (let i = 0; i < stories.length; i++) {
    let episodes = await getEpisodesByStoryID(stories[i].ID);
    stories[i].Episodes = episodes;
  }
  return stories;
};
/**
 * Queries the database for a specific story with given ID
 * @param {number} ID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the
 * given story ID with all episodes and drawing/writing prompts
 */
const getById = async (ID) => {
  const story = await db('Stories').where('Stories.ID', ID);
  const episodes = await getEpisodesByStoryID(ID);
  const episodesArray = [];
  for (let i = 0; i < episodes.length; i++) {
    episodesArray.push(episodes[i]);
  }
  for (let i = 0; i < episodesArray.length; i++) {
    let prompts = await getPromptsByEpisodeID(episodesArray[i].ID);
    episodesArray[i].WritingPrompt = prompts[0].WritingPrompt.Prompt;
    episodesArray[i].DrawingPrompt = prompts[0].DrawingPrompt.Prompt;
  }
  const storyWithEpisodes = {
    ID: story[0].ID,
    Title: story[0].Title,
    Description: story[0].Description,
    Author: story[0].Author,
    Episodes: episodesArray,
  };
  return [storyWithEpisodes];
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
  return db('Stories').where({ ID }).update(changes);
};

/**
 * Queries the database to remove a row
 * @param {number} ID the ID of the row to delete
 * @returns {Promise} a promise that resolves to the number of rows deleted
 */
const remove = (ID) => {
  return db('Stories').where({ ID }).del();
};

/**
 * Queries the database to retrieve all episodesfor a specific story with given ID
 * @param {number} storyID the ID to search for in the database
 * @returns {Promise} a promise that resolves to story object of the given story ID
 */
const getEpisodesByStoryID = (storyID) => {
  return db('Episodes as e')
    .join('Stories as s', 'e.StoryID', 's.ID')
    .where('s.ID', storyID)
    .select(
      'e.ID',
      'e.StoryID',
      'e.EpisodeNumber',
      'e.TextURL',
      'e.AudioURL',
      'e.Content'
    );
};

/**
 * Queries the database for a specific episode with given ID
 * @param {number} episodeID the ID to search for in the database
 * @returns {Promise} a promise that resolves to episode object of the given story ID
 */
const getEpisodeByID = (episodeID) => {
  return db('Episodes as e')
    .where('e.ID', episodeID)
    .select(
      'e.ID',
      'e.StoryID',
      'e.EpisodeNumber',
      'e.TextURL',
      'e.AudioURL',
      'e.Content'
    );
};

/**
 * Queries the database for a specific prompts with given episode ID
 * @param {number} episodeID the ID to search for in the database
 * @returns {Promise} a promise that resolves to drawing prompt object of the given episode ID
 */
const getPromptsByEpisodeID = async (episodeID) => {
  let writing = await db('Story-Prompts as sp')
    .where('sp.EpisodeID', episodeID)
    .andWhere('sp.Type', 'Writing')
    .select('sp.Prompt');
  let drawing = await db('Story-Prompts as sp')
    .where('sp.EpisodeID', episodeID)
    .andWhere('sp.Type', 'Drawing')
    .select('sp.Prompt');

  let episodePrompts = {
    WritingPrompt: writing[0],
    DrawingPrompt: drawing[0],
  };

  return [episodePrompts];
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
  getAllStories,
  getById,
  update,
  remove,
  getEpisodesByStoryID,
  getEpisodeByID,
  addEpisode,
  removeEpisode,
  updateEpisode,
  getPromptsByEpisodeID,
};
