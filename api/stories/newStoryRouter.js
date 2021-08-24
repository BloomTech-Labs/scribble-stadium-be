const router = require('express').Router();
const { crudOperationsManager } = require('../../lib');
const Stories = require('./newStoryModel');

router.get('/:id', (req, res) => {
  const { id } = req.params;

  crudOperationsManager.getById(res, Stories.getStoryByID, 'Story', id);
});

module.exports = router;
