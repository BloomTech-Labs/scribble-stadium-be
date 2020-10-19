const router = require('express').Router();

const { ops } = require('../../lib');
const { authRequired } = require('../middleware');

const Game = require('./gameModel');

/**
 * Data Types for Gamification
 * @swagger
 *  components:
 *    schemas:
 *      PageArrayItem:
 *        type: object
 *        properties:
 *          PageURL:
 *            type: string
 *            example: http://page1url
 *          PageNum:
 *            type: integer
 *            example: 1
 *      MemberObj:
 *        type: object
 *        properties:
 *          ChildID:
 *            type: integer
 *            example: 1
 *          MemberID:
 *            type: integer
 *            description: the child's membership ID to their squad/team
 *            example: 1
 *          SubmissionID:
 *            type: integer
 *            example: 1
 *          ImgURL:
 *            type: string
 *            example: http://imgurl.com
 *          Pages:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/PageArrayItem'
 *      GetTeam:
 *        type: object
 *        properties:
 *          Name:
 *            type: string
 *            description: Name of the team
 *            example: Team 1
 *          "[ChildId1]":
 *            $ref: '#/components/schemas/MemberObj'
 *          "[ChildId2]":
 *            $ref: '#/components/schemas/MemberObj'
 *
 *    parameters:
 *      childId:
 *        in: query
 *        name: childId
 *        description: the ID of the relevant child
 *        example: ?childId=1
 *        required: true
 *        schema:
 *          type: integer
 */

/**
 * @swagger
 * /game/squad?childId={id}:
 *  get:
 *    summary: returns the current Squad ID of a given child
 *    tags:
 *      - Gamification
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: Returns the Squad ID of the child
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ID:
 *                  type: integer
 *              example:
 *                ID: 1
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/squad', (req, res) => {
  const childId = req.query.childId;

  ops.getById(res, Game.getSquadIDFromChildID, 'Child', childId);
});

/**
 * @swagger
 * /game/team?childId={id}:
 *  get:
 *    summary: Gets submissions for a child and their teammate for the purpose of assigning points
 *    tags:
 *      - Gamification
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: Returns an object of a formatted team
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetTeam'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
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
