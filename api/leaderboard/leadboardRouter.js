const router = require('express').Router();

const { authRequired } = require('../middleware');
const leaderboard = require('./leadBoardModel');
const { crudOperationsManager } = require('../../lib/');

router.get('/', authRequired, (req, res) => {
  crudOperationsManager.getAll(res, leaderboard.getLeaderBoardData, 'Child');
});
router.get('/squad', (req, res) =>{
    crudOperationsManager.getAll(res, leaderboard.getSquadPoints, 'Child')
});

module.exports = router;
