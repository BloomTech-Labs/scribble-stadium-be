const router = require('express').Router();
const Game = require('./gamestateModel');
const { crudOperationsManager } = require('../../lib');
const { authRequired, emojiValidation } = require('../middleware');


//get state table by childID

router.get('/', authRequired, (req, res) => {
  const childId = req.query.childId;

  crudOperationsManager.getById(
    res,
    Game.getSquadIDFromChildID,
    'Child',
    childId
  );
});

module.exports = router;
