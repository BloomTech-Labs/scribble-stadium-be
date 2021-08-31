const router = require('express').Router();
const { crudOperationsManager } = require('../../lib');
const Stories = require('./storyNewModel');

router.get('/:id', (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getById(res, Stories.getById, 'Story', id);
});

module.exports = router;
