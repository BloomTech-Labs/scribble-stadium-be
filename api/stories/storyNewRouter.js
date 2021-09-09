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

router.get('/:id/episodes', async (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;
  crudOperationsManager.getAll(res, Stories.getEpisodesByStoryID, 'Story', id);
})

router.get('/:id/episode/:eid', (req, res) => {
  const { id ,eid } = req.params

  crudOperationsManager.getById(res, Stories.getEpisodeByID, 'Episode', id, eid);
});

router.post('/:id/episodes', (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params
  const newEpisode = req.body
  crudOperationsManager.post(res, Stories.addEpisode, 'Story', id, newEpisode);
})

router.put('/:id/episode/:eid', (req, res) => {
  // Pull relevant data out of the request object
  const { id, eid } = req.params
  const changes = req.body

  crudOperationsManager.update(res, Stories.updateEpisode, 'Episode', id, eid, changes)
})

router.delete('/:id/episode/:eid', (req, res) => {
  // Pull story ID out of the URL params
  const { id, eid } = req.params;

  crudOperationsManager.update(res, Stories.removeEpisode, 'Episode', id, eid)
});



module.exports = router;
