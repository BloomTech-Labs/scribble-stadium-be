const router = require('express').Router();

const { crudOperationsManager } = require('../../lib');

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

// Server-Side Transaction Trigger Endpoints

/**
 * @swagger
 * /mod/faceoffs:
 *  put:
 *    summary: An endpoint that triggers a transaction on the server that generates
 *             faceoffs for every squad.
 *    tags:
 *      - Moderation
 *    responses:
 *      200:
 *        $ref: '#/components/responses/EmptySuccess'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/faceoffs', (req, res) => {
  crudOperationsManager.update(res, Mod.generateFaceoffs, 'Faceoff');
});

router.put('/votesequence', (req, res) => {
  crudOperationsManager.update(res, Mod.generateVSequence, 'Children');
});

/**
 * @swagger
 * /mod/results:
 *  put:
 *    summary: An endpoint that triggers a transaction on the server that calculates
 *             the week's results for every squad.
 *    tags:
 *      - Moderation
 *    responses:
 *      200:
 *        $ref: '#/components/responses/EmptySuccess'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/results', (req, res) => {
  crudOperationsManager.update(res, Mod.calculateResultsForTheWeek, 'Results');
});

// Data Endpoints

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

  crudOperationsManager.update(
    res,
    Mod.moderatePost,
    'Submission',
    id,
    changes
  );
});

module.exports = router;
