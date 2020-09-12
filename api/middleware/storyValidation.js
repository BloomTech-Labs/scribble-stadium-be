const _has = require('lodash.has');

const storyValidation = (req, res, next) => {
  // Pull the task sent in the request body
  const story = req.body;
  if (
    _has(story, 'Title') &&
    _has(story, 'URL') &&
    _has(story, 'WritingPrompt') &&
    _has(story, 'DrawingPrompt')
  ) {
    // If it's valid, continue
    next();
  } else {
    // Otherwise, return a 400 w/ error message
    res.status(400).json({ error: 'InvalidStory' });
  }
};

const storyUpdateValidation = (req, res, next) => {
  // pull the changes sent in the request body
  const changes = req.body;
  if (
    _has(changes, 'Title') ||
    _has(changes, 'URL') ||
    _has(changes, 'WritingPrompt') ||
    _has(changes, 'DrawingPrompt')
  ) {
    // If it contains at least one valid field
    next();
  } else {
    res.status(400).json({ error: 'InvalidChanges' });
  }
};

module.exports = {
  storyValidation,
  storyUpdateValidation,
};
