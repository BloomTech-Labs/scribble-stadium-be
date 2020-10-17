const router = require('express').Router();

const { ops } = require('../../lib');
const { authRequired } = require('../middleware');

const Game = require('./gameModel');

router.get('/squad', (req, res) => {
  const childId = req.query.childId;

  ops.getById(res, Game.getSquadIDFromChildID, 'Child', childId);
});

/**
 * 200
 * 400
 * 404
 * 500
 */
router.get('/team', authRequired, (req, res) => {
  const childId = req.query.childId;

  ops.getAll(res, Game.getFormattedTeam, 'ChildID', childId);
});

/**
 * 201
 * 400
 * 401
 * 403
 * 404
 * 500
 */
router.post('/points', authRequired, (req, res) => {
  const points = req.body;

  ops.postMult(res, Game.assignPoints, 'Submission', points);
});

router.get('/faceoffs', (req, res) => {
  const squadId = req.query.squadId;

  ops.getAll(res, Game.getFaceoffsForSquad, 'Squad', squadId);
});

router.get('/votes', (req, res) => {
  const squadId = req.query.squadId;
  const memberId = req.query.memberId;

  ops.getAll(res, Game.getVotesBySquad, 'Squad', squadId, memberId);
});

router.post('/votes', (req, res) => {
  const vote = req.body;

  ops.post(res, Game.submitVote, 'Vote', vote);
});

router.get('/results', (req, res) => {
  const squadId = req.query.squadId;

  ops.getAll(res, Game.getSquadResults, 'Squad', squadId);
});

module.exports = router;
