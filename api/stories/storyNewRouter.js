const router = require('express').Router();
const { crudOperationsManager } = require('../../lib');
const Stories = require('./storyNewModel');

router.post('/', (req, res) => {
  // Pull relevant data out of the request object
  const newStory = req.body;

  crudOperationsManager.post(res, Stories.add, 'Story', newStory);
});

router.get('/:id', (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getById(res, Stories.getById, 'Story', id);
});

router.put('/:id', (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const changes = req.body;

  crudOperationsManager.update(res, Stories.update, 'Story', id, changes);
});

router.delete('/:id', (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.update(res, Stories.remove, 'Story', id);
});

module.exports = router;
