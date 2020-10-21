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
 *      ArrayOfPages:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/PageArrayItem'
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
 *            $ref: '#/components/schemas/ArrayOfPages'
 *      FaceoffSubmissionObject:
 *        type: object
 *        properties:
 *          ID:
 *            type: integer
 *            description: Submission ID
 *            example: 1
 *          ImgURL:
 *            type: string
 *            example: http://imgurl.com
 *          Name:
 *            type: string
 *            description: Name of the child
 *            example: Voldemort
 *          AvatarURL:
 *            type: string
 *            description: the URL of the avatar for the child whose submission it is
 *            example: http://someavatar.com
 *          Pages:
 *            $ref: '#/components/schemas/ArrayOfPages'
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
 *      PointsObject:
 *        type: object
 *        properties:
 *          WritingPoints:
 *            type: integer
 *            example: 35
 *          DrawingPoints:
 *            type: integer
 *            example: 15
 *          MemberID:
 *            type: integer
 *            description: The child's MEMBER ID (not child ID) that is casting the vote
 *            example: 1
 *          SubmissionID:
 *            type: integer
 *            description: The ID of the submission the points are being assigned to
 *            example: 2
 *      GetFaceoffsForVoting:
 *        type: object
 *        properties:
 *          ID:
 *            type: integer
 *            description: The faceoff ID
 *            example: 1
 *          Points:
 *            type: integer
 *            description: the points that a matchup is worth
 *            example: 100
 *          Winner:
 *            type: integer
 *            description: The winning submission #, either 1, 2, or 0 for a tie
 *            enum:
 *              - 0
 *              - 1
 *              - 2
 *          Type:
 *            type: string
 *            description: The submission type for the matchup (writing or drawing). Both are provided
 *                         in the submission objects, but only one will be used based on this value.
 *            enum:
 *              - Writing
 *              - Drawing
 *          SquadID:
 *            type: integer
 *            description: The Squad ID
 *          Submission1:
 *            $ref: '#/components/schemas/FaceoffSubmissionObject'
 *          Submission2:
 *            $ref: '#/components/schemas/FaceoffSubmissionObject'
 *          SubmissionID1:
 *            type: integer
 *            example: 1
 *          SubmissionID2:
 *            type: integer
 *            example: 2
 *      GetVote:
 *        type: object
 *        properties:
 *          FaceoffID:
 *            type: integer
 *            description: unique ID for faceoff
 *          Vote:
 *            type: integer
 *            description: the submission num they voted on, either 1 or 2
 *            enum:
 *              - 1
 *              - 2
 *      PostVote:
 *        allOf:
 *          - $ref: '#/components/schemas/GetVote'
 *          - type: object
 *            properties:
 *              MemberID:
 *                type: integer
 *                description: The unique member ID of the child (NOT child ID)
 *                example: 1
 *      ResultsObj:
 *        type: object
 *        properties:
 *          ID:
 *            type: integer
 *            description: Team ID
 *            example: 1
 *          CohortID:
 *            type: integer
 *            example: 1
 *          SquadID:
 *            type: integer
 *            example: 1
 *          Num:
 *            type: integer
 *            description: Team number (1 or 2)
 *            enum:
 *              - 1
 *              - 2
 *          Name:
 *            type: string
 *            description: Team name
 *            example: Team 1
 *          Winner:
 *            type: integer
 *            description: The winning team number - 1, 2, or 0 for a tie
 *            enum:
 *              - 0
 *              - 1
 *              - 2
 *          Points:
 *            type: integer
 *            description: The amount of points a team won
 *            example: 200
 *      Results:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/ResultsObj'
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
 *      squadId:
 *        in: query
 *        name: squadId
 *        description: the ID of the child's squad
 *        example: ?squadId=1
 *        required: true
 *        schema:
 *          type: integer
 *      memberId:
 *        in: query
 *        name: memberId
 *        description: the child's member ID
 *        example: ?memberId=1
 *        required: true
 *        schema:
 *          type: integer
 */

/**
 * @swagger
 * /game/squad?childId={id}:
 *  get:
 *    summary: returns the current Squad ID of a given child
 *    security:
 *      - okta: []
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
router.get('/squad', authRequired, (req, res) => {
  const childId = req.query.childId;

  ops.getById(res, Game.getSquadIDFromChildID, 'Child', childId);
});

/**
 * @swagger
 * /game/team?childId={id}:
 *  get:
 *    summary: Gets submissions for a child and their teammate for the purpose of assigning points
 *    security:
 *      - okta: []
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
 * @swagger
 * /game/points:
 *  post:
 *    summary: Send a child's point assignments to the server to be stored
 *    security:
 *      - okta: []
 *    tags:
 *      - Gamification
 *    requestBody:
 *      description: An array containing two points objects, one for each submission on
 *                   the team (the child's and their teammate's). It is highly recommended
 *                   to send both up together.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/PointsObject'
 *    responses:
 *      201:
 *        description: Returns an array of the id references to the new votes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example: [ 1, 2 ]
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/DuplicateError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/points', authRequired, (req, res) => {
  const points = req.body;

  ops.postMult(res, Game.assignPoints, 'Submission', points);
});

/**
 * @swagger
 * /game/faceoffs?squadId={id}:
 *  get:
 *    summary: Returns an array of a squad's 4 faceoffs after they've been calculated
 *    security:
 *      - okta: []
 *    tags:
 *      - Gamification
 *    parameters:
 *      - $ref: '#/components/parameters/squadId'
 *    responses:
 *      200:
 *        description: Returns an array of 4 1v1 matchups for a squad to vote on
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetFaceoffsForVoting'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/faceoffs', authRequired, (req, res) => {
  const squadId = req.query.squadId;

  ops.getAll(res, Game.getFaceoffsForSquad, 'Squad', squadId);
});

/**
 * @swagger
 * /game/votes?squadId={id}&memberId={id}:
 *  get:
 *    summary: Gets a list of a users votes for the current squad to make sure that they can't vote again
 *    security:
 *      - okta: []
 *    tags:
 *      - Gamification
 *    parameters:
 *      - $ref: '#/components/parameters/squadId'
 *      - $ref: '#/components/parameters/memberId'
 *    responses:
 *      200:
 *        description: returns an array of all of a member's votes for the current squad (0-4 length)
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetVote'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/votes', authRequired, (req, res) => {
  const squadId = req.query.squadId;
  const memberId = req.query.memberId;

  ops.getAll(res, Game.getVotesBySquad, '', squadId, memberId);
});

/**
 * @swagger
 * /game/votes:
 *  post:
 *    summary: Submits a user's vote to the database
 *    security:
 *      - okta: []
 *    tags:
 *      - Gamification
 *    requestBody:
 *      description: An object containing identifiers and the child's vote
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostVote'
 *    responses:
 *      201:
 *        description: Returns an array with the id reference to the new vote
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example: [ 1 ]
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/DuplicateError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/votes', authRequired, (req, res) => {
  const vote = req.body;

  ops.post(res, Game.submitVote, 'Vote', vote);
});

/**
 * @swagger
 * /game/results?squadId={id}:
 *  gett:
 *    summary: Submits a user's vote to the database
 *    security:
 *      - okta: []
 *    tags:
 *      - Gamification
 *    parameters:
 *      - $ref: '#/components/parameters/squadId'
 *    responses:
 *      200:
 *        description: Returns an array with the results of the squad matchup
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Results'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/results', authRequired, (req, res) => {
  const squadId = req.query.squadId;

  ops.getAll(res, Game.getSquadResults, 'Squad', squadId);
});

module.exports = router;
