const router = require('express').Router();
const Game = require('./gamestateModel');
const { crudOperationsManager } = require('../../lib');
const { authRequired, emojiValidation } = require('../middleware');

//get state table by childID

router.get('/:id', authRequired, (req, res) => {
  const childId = req.params.id;

  crudOperationsManager.getById(
    res,
    Game.getGameStateTimesbyID,
    'Child',
    childId
  );
});

module.exports = router;
