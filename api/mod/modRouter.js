const router = require('express').Router();

const { ops } = require('../../lib');

const Mod = require('./modModel');

/**
 * Data types for mod operations
 * @swagger
 * components:
 *  schemas:
 *    Cohort:
 *      type: object
 *      properties:
 *        StoryID:
 *          type: integer
 *      example:
 *        StoryID: 1
 *    PostCohort:
 *      allOf:
 *        - $ref: '#/components/schemas/Cohort'
 *        - type: object
 *          required:
 *            StoryID
 *    GetCohort:
 *      allOf:
 *        - type: object
 *          properties:
 *            ID:
 *              type: integer
 *              readOnly: true
 *          example:
 *            ID: 1
 *        - $ref: '#/components/schemas/Cohort'
 */

/**
 * @swagger
 * /mod/cohorts:
 *  get:
 *    summary: Queries the database for a list of all open cohorts
 *    tags:
 *      - Moderation
 *    responses:
 *      200:
 *        description: Returns an array of cohorts from the database
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetCohort'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/cohorts', (req, res) => {
  ops.getAll(res, Mod.getCohorts, 'Cohort');
});

/**
 * @swagger
 * /mod/cohorts:
 *  post:
 *    summary: Attempts to add new cohort(s) to the database
 *    tags:
 *      - Moderation
 *    requestBody:
 *      decription: New cohort object(s)
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostCohort'
 *    responses:
 *      201:
 *        description: Returns the ID(s) of the new cohort in an array
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: integer
 *                example: 1
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/cohorts', (req, res) => {
  const newCohort = req.body;

  ops.postMult(res, Mod.addCohort, 'Cohort', newCohort);
});

/**
 * @swagger
 * /mod/submissions?cohortId={cohortId}:
 *  get:
 *    summary: Returns a hash table of all submissions for a given cohort
 *    tags:
 *      - Moderation
 *    parameters:
 *      - $ref: '#/components/parameters/cohortQuery'
 *    responses:
 *      200:
 *        description: An hash table of all the submissions. The keys are submission IDs and the keys of the pages are the page number
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                "[SubmissionID]":
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      enum:
 *                        - CLEAR
 *                        - PENDING
 *                        - ACCEPTED
 *                        - REJECTED
 *                      description: The status of the submission, CLEAR - incomplete, PENDING - complete, pending review
 *                    inappropriate:
 *                      type: boolean
 *                      description: A true/false indicating if the text has inappropriate content
 *                    sensitive:
 *                      type: boolean
 *                      description: A true/false indicating if the text has sensitive content
 *                    image:
 *                      type: string
 *                      description: The string url of the image submission
 *                      example: http://urlofdrawing.com
 *                    pages:
 *                      type: object
 *                      properties:
 *                        "[PageNum]":
 *                          type: string
 *                          description: A hash table of pages where the key is the page num and the value is the page img url
 *                          example: http://urlofpage1.com
 *                      example:
 *                        1: http://urlofpage1.com
 *                        2: http://urlofpage2.com
 */
router.get('/submissions', (req, res) => {
  const cohortId = req.query.cohortId;

  ops.getAll(res, Mod.getSubmissionsByCohort, 'Cohort', cohortId);
});

/**
 * @swagger
 * /mod/submissions/{id}:
 *  put:
 *    summary: Attempts to update the submission with the given ID
 *    tags:
 *      - Moderation
 *    parameters:
 *      - $ref: '#/components/parameters/submissionId'
 *    requestBody:
 *      description: Status to be applied to the given submission
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              Status:
 *                type: string
 *                enum:
 *                  - CLEAR
 *                  - PENDING
 *                  - ACCEPTED
 *                  - REJECTED
 *    responses:
 *      204:
 *        $ref: '#/components/responses/EmptySuccess'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/submissions/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  ops.update(res, Mod.moderatePost, 'Submission', id, changes);
});

router.put('/faceoffs', (req, res) => {
  ops.update(res, Mod.generateFaceoffs, 'Faceoff');
});

module.exports = router;
