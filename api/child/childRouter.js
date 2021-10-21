const router = require('express').Router();

const {
  authRequired,
  childValidation,
  childUpdateValidation,
} = require('../middleware');
const { crudOperationsManager } = require('../../lib/');

const Children = require('./childModel');

/**
 * Schemas for child data types.
 * @swagger
 * components:
 *  schemas:
 *    Child:
 *      type: object
 *      properties:
 *        Name:
 *          type: string
 *        PIN:
 *          type: string
 *        IsDyslexic:
 *          type: boolean
 *        CohortID:
 *          type: integer
 *          description: Foreign key to child's current cohort
 *      example:
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        IsDyslexic: false
 *        CohortID: 1
 *    PutChild:
 *      allOf:
 *        - $ref: '#/components/schemas/Child'
 *        - type: object
 *          properties:
 *            ParentID:
 *              type: integer
 *              description: Foreign key to the Parents table.
 *          example:
 *            ParentID: 1
 *            AvatarID: 1
 *            GradeLevelID: 1
 *    PostChild:
 *      allOf:
 *        - $ref: '#/components/schemas/PutChild'
 *        - type: object
 *          required:
 *            - Name
 *            - PIN
 *            - IsDyslexic
 *            - AvatarID
 *            - GradeLevelID
 *            - ParentID
 *    GetChild:
 *      allOf:
 *        - type: object
 *          required:
 *            - ID
 *          properties:
 *            ID:
 *              type: integer
 *              readOnly: true
 *              description: Auto-incrementing primary key
 *            AvatarURL:
 *              type: string
 *              description: URL pulled from from foreign Avatars table
 *            GradeLevel:
 *              type: string
 *              description: Grade level pulled from foreign GradeLevels table
 *          example:
 *            ID: '1'
 *            AvatarURL: 'http://www.someurl.com'
 *            GradeLevel: '3'
 *        - $ref: '#/components/schemas/PostChild'
 *
 *  parameters:
 *    childId:
 *      name: ID
 *      in: path
 *      description: ID of child
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 */

/**
 * @swagger
 * /children:
 *  get:
 *    summary: Attempts to query the database for a list of all children.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    responses:
 *      200:
 *        description: Returns an array of all children in the database.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetChild'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, (req, res) => {
  crudOperationsManager.getAll(res, Children.getAll, 'Child');
});

/**
 * @swagger
 * /children/{id}:
 *  get:
 *    summary: Attempts to query the database for a child with the given ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: Returns the requested child object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetChild'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */

router.get('/:id', authRequired, (req, res) => {
  // Pull child ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getById(res, Children.getById, 'Child', id);
});

/**
 * @swagger
 * /child/{id}/complexity:
 *  get:
 *    summary: Attempts to query the database for the complexity ratings of a child with the given ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: Returns an array of complexities from the database.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Complexity'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/:id/complexity', authRequired, async (req, res) => {
  // Pull the relevant child ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getAll(res, Children.getComplexityList, 'Child', id);
});

/**
 * @swagger
 * /child:
 *  post:
 *    summary: Attempts to add a new child to the database.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    requestBody:
 *      description: Object to be added to the Children table.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostChild'
 *    responses:
 *      201:
 *        description: Returns the ID of the newly created child.
 *        content:
 *          application/json:
 *            example: 1
 *            schema:
 *              type: integer
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/', authRequired, childValidation, (req, res) => {
  // Pull relevant data out of the request object
  const newChild = req.body;

  crudOperationsManager.post(res, Children.add, 'Child', newChild);
});

/**
 * @swagger
 * /child/{id}:
 *  put:
 *    summary: Attempts to update the child with the given ID parameter.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    requestBody:
 *      description: Changes to be applied to the specified child.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutChild'
 *    responses:
 *      204:
 *        $ref: '#/components/responses/EmptySuccess'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/:id', authRequired, childUpdateValidation, (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const changes = req.body;

  crudOperationsManager.update(res, Children.update, 'Child', id, changes);
});

/**
 * @swagger
 * /child/{id}:
 *  delete:
 *    summary: Attempts to delete the child with the specified ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
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
router.delete('/:id', authRequired, (req, res) => {
  // Pull child ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.update(res, Children.remove, 'Child', id);
});

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
 * /child/{id}/submissions/{id}:
 *  get:
 *    summary: Queries the database for information for the given submission.
 *    description: Attempts to query the database to find a submission entry at the intersection
 *      of the given Child ID and Story ID. If none is found, one will be created and initialized
 *      with a childId, storyId, episodeId, episodeStartDate, and createdAt timestamp.
 *    security:
 *      - auth0: []
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
 *      - in: query
 *        name: episodeId
 *        schema:
 *          type: integer
 *        required: true
 *        description: numeric ID of episode
 *      - in: query
 *        name: episodeStartDate
 *        schema:
 *          type: date
 *        required: true
 *        description: start date of current episode
 *      - in: query
 *        name: createdAt
 *        schema:
 *          type: timestamp
 *        required: true
 *        description: when the submission record was created
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

/**
 * @swagger
 * /child/{id}/submissions:
 *  get:
 *    summary: Attempts to get all data for every submission by a given child
 *    security:
 *      - auth0: []
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

//A GET all submissions route intended for dev/admin purposes.
router.get('/:id/submissions', authRequired, async (req, res) => {
  // Pull child ID out of URL parameter
  const { id } = req.params;

  crudOperationsManager.getAll(
    res,
    Children.getAllSubmissions,
    'Submission',
    id
  );
});

//To return a single submission
router.get('/:childId/submissions/:id', authRequired, async (req, res) => {
  //Pull submission ID out of URL parameter
  const { childId, id } = req.params;

  crudOperationsManager.getAll(
    res,
    Children.getSubmissionBySubId,
    'Submissions',
    childId,
    id
  );
});

//To create the initial submission record when the child accepts the mission.
router.post('/:id/submissions', authRequired, (req, res) => {
  //childId, storyId, episodeId, episodeStartDate are not nullable and required in body from front-end
  const newSubmission = req.body;

  crudOperationsManager.post(
    res,
    Children.addSubmission,
    'Submission',
    newSubmission
  );
});

//To update the submission record, for example when the child has finished reading or moderation status changes.
router.put('/:id/submissions/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  crudOperationsManager.update(
    res,
    Children.updateSubmissionBySubId,
    'Submission',
    id,
    changes
  );
});

//Delete route for dev/admin purposes
router.delete('/:id/submissions/:id', authRequired, async (req, res) => {
  //Pull submission ID out of URL parameter
  const { id } = req.params;

  crudOperationsManager.update(
    res,
    Children.removeSubmission,
    'Submission',
    id
  );
});

module.exports = router;
