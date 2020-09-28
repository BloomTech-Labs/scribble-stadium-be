const router = require('express').Router();
const Submissions = require('./submissionModel');
const authRequired = require('../middleware/authRequired');

/**
 * Schemas for submission data types.
 * @swagger
 * components:
 *  schemas:
 *    SubmissionStatus:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *        ChildID:
 *          type: integer
 *        StoryID:
 *          type: integer
 *        HasRead:
 *          type: boolean
 *        HasWritten:
 *          type: boolean
 *        HasDrawn:
 *          type: boolean
 *        Complexity:
 *          type: integer
 *      example:
 *        ID: 1
 *        ChildID: 1
 *        StoryID: 1
 *        HasRead: false
 *        HasWritten: false
 *        HasDrawn: false
 *        Complexity: null
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
 * /submission:
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
  const { childId, storyId } = req.query;

  // Check to make sure both IDs are given
  if (!childId || !storyId) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }

  try {
    const sub = await Submissions.getOrInitSubmission(childId, storyId);
    res.status(200).json(sub);
  } catch ({ message }) {
    if (message.includes('violates foreign key constraint')) {
      res.status(404).json({ error: 'InvalidID' });
    } else {
      res.status(500).json({ message });
    }
  }
});

/**
 * @swagger
 * /submit/read/{id}:
 *  put:
 *    summary: Attempts to mark the submission with the given ID as 'read'
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - $ref: '#/components/parameters/submissionId'
 *    responses:
 *      204:
 *        $ref: '#/components/responses/EmptySuccess'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/read/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Submissions.markAsRead(id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'SubmissionNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
