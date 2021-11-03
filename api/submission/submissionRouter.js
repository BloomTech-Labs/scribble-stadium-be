const router = require('express').Router();

const {
  authRequired,
  fileUpload,
  validateUpdateAllTasksParams,
} = require('../middleware');
const { crudOperationsManager } = require('../../lib');

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
 *        CohortID:
 *          type: integer
 *        HasRead:
 *          type: boolean
 *        HasWritten:
 *          type: boolean
 *        HasDrawn:
 *          type: boolean
 *        Complexity:
 *          type: integer
 *        LowConfidence:
 *          type: boolean
 *        Status:
 *          type: string
 *          enum:
 *            - CLEAR
 *            - PENDING
 *            - ACCEPTED
 *            - REJECTED
 *      example:
 *        ID: 1
 *        ChildID: 1
 *        StoryID: 1
 *        CohortID: 1
 *        HasRead: false
 *        HasWritten: false
 *        HasDrawn: false
 *        Complexity: null
 *        Status: PENDING
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
 *        CohortId:
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

  crudOperationsManager.update(
    res,
    Submissions.deleteWritingSubmission,
    'Submission',
    id
  );
});

module.exports = router;
