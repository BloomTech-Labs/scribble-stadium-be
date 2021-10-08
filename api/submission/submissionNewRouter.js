const router = require('express').Router();

const { authRequired } = require('../middleware');
const { crudOperationsManager } = require('../../lib');

const Submissions = require('./submissionNewModel');

/**
 * Schemas for submission data types.
 * @swagger
 * components:
 *  schemas:
 *    SubmissionStatus:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        childId:
 *          type: integer
 *        storyId:
 *          type: integer
 *        episodeId:
 *          type: integer
 *        episodeStartDate:
 *          type: date
 *        moderationStatus:
 *          type: string
 *        startedReadingAt:
 *          type: timestamp
 *        finishedReadingAt:
 *          type: timestamp
 *        complexity:
 *          type: integer
 *        lowConfidence:
 *          type: boolean
 *        createdAt:
 *          type: timestamp
 *        updatedAt:
 *          type: timestamp
 *      example:
 *        ID: 1
 *        childId: 1
 *        storyId: 1
 *        episodeId: 1
 *        episodeStartDate: '2021-01-03'
 *        moderationStatus: not received
 *        startedReadingAt: null
 *        finishedReadingAt: null
 *        complexity: 1
 *        lowConfidence: false
 *        createdAt: 2021-10-08 19:13:54.822+00
 *        updatedAt: 2021-10-08 19:13:54.822+00
 *
 *  parameters:
 *    submissionId:
 *      name: Submission ID
 *      in: path
 *      description: ID of the desired submission
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 */

/**
 * @swagger
 * /submission?childId={childId}&storyId={storyId}:
 *  get:
 *    summary: Queries the database for information for the given submission.
 *    description: Attempts to query the database to find a submission entry at the intersection
 *      of the given Child ID and Story ID. If none is found, one will be created and initialized
 *      with all false/null values.
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - in: query
 *        name: childId
 *        schema:
 *          type: integer
 *        required: true
 *        description: numeric ID of child
 *      - in: query
 *        name: storyId
 *        schema:
 *          type: integer
 *        required: true
 *        description: numeric ID of story
 *    responses:
 *      200:
 *        description: Returns an object containing the data for the requested submission
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubmissionStatus'
 *      400:
 *        $ref: '#/components/responses/MissingParameters'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/InvalidID'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, async (req, res) => {
  // Pull intersection IDs out of the URL querystring
  const { childId, storyId } = req.query;

  crudOperationsManager.getAll(
    res,
    Submissions.getOrInitSubmission,
    'Submission',
    childId,
    storyId
  );
});

/**
 * @swagger
 * /submissions/child/{id}:
 *  get:
 *    summary: Attempts to get all data for every submission by a given child
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: Returns an array of all submissions by a child
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/FullSubmission'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/child/:id', authRequired, async (req, res) => {
  // Pull child ID out of URL parameter
  const { id } = req.params;

  crudOperationsManager.getAll(
    res,
    Submissions.getAllSubmissionsByChild,
    'Submission',
    id
  );
});

module.exports = router;
