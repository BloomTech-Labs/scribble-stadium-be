const router = require('express').Router();

const { ops } = require('../../lib');
const { authRequired } = require('../middleware');

const Game = require('./gameModel');

router.get('/team', authRequired, (req, res) => {
  const childId = req.query.childId;

  ops.getAll(res, Game.getFormattedTeam, 'ChildID', childId);
});

module.exports = router;
