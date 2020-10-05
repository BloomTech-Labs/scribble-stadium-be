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
 *    GetDrawnSubmission:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *        URL:
 *          type: string
 *        SubmissionID:
 *          type: integer
 *      example:
 *        ID: 1
 *        URL: 'http://someurl.com'
 *        SubmissionID: 1
 *    GetWrittenSubmission:
 *      allOf:
 *        - $ref: '#/components/schemas/GetDrawnSubmission'
 *        - type: object
 *          properties:
 *            PageNum:
 *              type: integer
 *          example:
 *            PageNum: 1
 *    FullSubmission:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *        ChildId:
 *          type: integer
 *        StoryId:
 *          type: integer
 *        HasRead:
 *          type: boolean
 *        HasWritten:
 *          type: boolean
 *        HasDrawn:
 *          type: boolean
 *        Complexity:
 *          type: integer
 *        pages:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/GetWrittenSubmission'
 *        image:
 *          $ref: '#/components/schemas/GetDrawnSubmission'
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

  ops.getAll(
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

  ops.getAll(res, Submissions.getAllSubmissionsByChild, 'Submission', id);
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
  // Pull submission ID out of URL parameter
  const { id } = req.params;

  ops.update(res, Submissions.markAsRead, 'Submission', id);
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
 *        $ref: '#/components/responses/DuplicateError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/UploadFailed'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/write/:id', authRequired, fileUpload, async (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const storyId = req.body.storyId;
  const pages = req.body.pages;

  // Callback function to pass into map taht formats the data properly
  const cb = (x, i) => ({
    URL: x.Location,
    PageNum: i + 1,
    SubmissionID: id,
    checksum: x.Checksum,
  });

  ops.submission(
    res,
    Submissions.submitWritingTransaction,
    'Submission',
    pages,
    cb,
    id,
    storyId
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
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/DrawnSubmission'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/DuplicateError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/UploadFailed'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/draw/:id', authRequired, fileUpload, async (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const data = req.body.drawing;

  // Callback function to pass into map taht formats the data properly
  const cb = (x) => ({
    URL: x.Location,
    SubmissionID: id,
    checksum: x.Checksum,
  });

  ops.submission(
    res,
    Submissions.submitDrawingTransaction,
    'Submission',
    data,
    cb,
    id
  );
});

/**
 * @swagger
 * /submission/write/{id}:
 *  delete:
 *    summary: Attempts to delete the writing submission with the specified submission ID.
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
router.delete('/write/:id', authRequired, async (req, res) => {
  // Pull submission ID out of the URL parameter
  const { id } = req.params;

  ops.update(res, Submissions.deleteWritingSubmission, 'Submission', id);
});

/**
 * @swagger
 * /submission/write/{id}:
 *  delete:
 *    summary: Attempts to delete the drawn submission with the specified submission ID.
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
router.delete('/draw/:id', authRequired, async (req, res) => {
  // Pull submission ID out of the URL parameter
  const { id } = req.params;

  ops.update(res, Submissions.deleteDrawingSubmission, 'Submission', id);
});

module.exports = router;
