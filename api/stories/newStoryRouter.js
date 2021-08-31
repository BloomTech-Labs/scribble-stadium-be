const router = require('express').Router();
const { crudOperationsManager } = require('../../lib');
const Stories = require('./newStoryModel');

router.get('/:id', (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getById(res, Stories.getStoryByID, 'Story', id);
});

router.get('/:id/episodes', async (req, res) => {
   // Pull story ID out of the URL params
  const { id } = req.params;
  crudOperationsManager.getAll(res, Stories.getEpisodesByStoryID, 'Story', id);
})


module.exports = router;
