const router = require('express').Router();

const { authRequired, fileUpload } = require('../middleware');
const { ops } = require('../../lib');

const Submissions = require('./submissionModel');

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
 *    DrawnSubmission:
 *      type: object
 *      properties:
 *        URL:
 *          type: string
 *        checksum:
 *          type: string
 *      example:
 *        URL: http://someurl.com
 *        checksum: '25ef9314704f5f68b7e04513c1ca13c9146328ee14a38e1d7c99789ab11fae31e1c0238425d58581b3ac4941884cd389b7bea3f8e658f533adc7cf934bb130f8'
 *
 *    WrittenSubmission:
 *      allOf:
 *        - $ref: '#/components/schemas/DrawnSubmission'
 *        - type: object
 *          properties:
 *            PageNum:
 *              type: integer
 *          example:
 *            PageNum: 1
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
  ops.getAll(
    res,
    Submissions.getOrInitSubmission,
    'Submission',
    req.query.childId,
    req.query.storyId
  );
});

router.get('/child/:id', authRequired, async (req, res) => {
  ops.getAll(
    res,
    Submissions.getAllSubmissionsByChild,
    'Submission',
    req.params.id
  );
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
  ops.put(res, Submissions.markAsRead, 'Submission', req.params.id);
});

/**
 * @swagger
 * /submit/write/{id}:
 *  post:
 *    summary: Attempts to upload pages for the submission with the given ID
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - $ref: '#/components/parameters/submissionId'
 *      - in: formData
 *        name: pages
 *        type: file
 *        description: Image of the written page(s) to upload
 *    responses:
 *      201:
 *        description: Returns an array of all uploaded pages.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/WrittenSubmission'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/OneSubmission'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/UploadFailed'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/write/:id', authRequired, fileUpload, async (req, res) => {
  // Callback function to pass into map taht formats the data properly
  const cb = (x, i) => ({
    URL: x.Location,
    PageNum: i + 1,
    SubmissionID: req.params.id,
    checksum: x.Checksum,
  });

  ops.submission(
    res,
    Submissions.submitWritingTransaction,
    'Submission',
    req.body.pages,
    cb,
    req.params.id,
    req.body.storyId
  );
});

/**
 * @swagger
 * /submit/draw/{id}:
 *  post:
 *    summary: Attempts to upload a drawing for the submission with the given ID
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - $ref: '#/components/parameters/submissionId'
 *      - in: formData
 *        name: drawing
 *        type: file
 *        description: Image of the drawing to upload
 *    responses:
 *      201:
 *        description: Returns the newly uploaded drawing.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DrawnSubmission'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/UploadFailed'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/draw/:id', authRequired, fileUpload, async (req, res) => {
  // Callback function to pass into map taht formats the data properly
  const cb = (x) => ({
    URL: x.Location,
    SubmissionID: req.params.id,
    checksum: x.Checksum,
  });

  ops.submission(
    res,
    Submissions.submitDrawingTransaction,
    'Submission',
    req.body.drawing,
    cb,
    req.params.id
  );
});

router.delete('/write/:id', authRequired, async (req, res) => {
  ops.deleteById(
    res,
    Submissions.deleteWritingSubmission,
    'Submission',
    req.params.id
  );
});

router.delete('/draw/:id', authRequired, async (req, res) => {
  ops.deleteById(
    res,
    Submissions.deleteDrawingSubmission,
    'Submission',
    req.params.id
  );
});

module.exports = router;
