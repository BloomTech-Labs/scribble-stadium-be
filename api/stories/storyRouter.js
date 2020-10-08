const router = require('express').Router();

const {
  authRequired,
  storyValidation,
  storyUpdateValidation,
} = require('../middleware');
const { ops } = require('../../lib');

const Stories = require('./storyModel');

/**
 * Schemas for story data types.
 * @swagger
 * components:
 *  schemas:
 *    Story:
 *      type: object
 *      properties:
 *        Title:
 *          type: string
 *          decription: Title of the story
 *        URL:
 *          type: string
 *          description: URL to the PDF file of the story
 *        WritingPrompt:
 *          type: string
 *          description: Short 1-3 sentence writing prompt
 *        DrawingPrompt:
 *          type: string
 *          description: Short 1-3 sentence drawing prompt
 *      example:
 *        Title: 'Studies in Modern Movement'
 *        URL: 'http://www.someurl.com'
 *        WritingPrompt: 'Write something about the story you just read.'
 *        DrawingPrompt: 'Draw something that happened in the story you just read.'
 *    PostStory:
 *      allOf:
 *        - $ref: '#/components/schemas/Story'
 *        - type: object
 *          required:
 *            - Title
 *            - URL
 *            - WritingPrompt
 *            - DrawingPrompt
 *    GetStory:
 *      allOf:
 *        - type: object
 *          required:
 *            - ID
 *          properties:
 *            ID:
 *              type: integer
 *              readOnly: true
 *              description: Auto-incrementing primary key
 *          example:
 *            ID: 1
 *        - $ref: '#/components/schemas/PostStory'
 *
 *  parameters:
 *    storyId:
 *      name: ID
 *      in: path
 *      description: The unique ID of a story object.
 *      example: 1
 *      schema:
 *        type: integer
 *    cohortQuery:
 *      name: cohortId
 *      in: query
 *      description: a query parameter that tells the server the cohort to search by
 *      example: ?cohortId=1
 *      schema:
 *        type: integer
 */

/**
 * @swagger
 * /story?cohortId={id}:
 *  get:
 *    summary: Returns the story for the given cohort.
 *    security:
 *      - okta: []
 *    tags:
 *      - Stories
 *    parameters:
 *      - $ref: '#/components/parameters/cohortQuery'
 *    responses:
 *      200:
 *        description: Returns the current story for the given cohort.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetStory'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res) => {
  const cohortId = req.query.cohortId;

  ops.getById(res, Stories.getByCohortId, 'Story', cohortId);
});

/**
 * @swagger
 * /stories/{id}:
 *  get:
 *    summary: Attempts to query the database for a story with the given ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Stories
 *    parameters:
 *      - $ref: '#/components/parameters/storyId'
 *    responses:
 *      200:
 *        description: Returns the requested story object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetStory'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/:id', authRequired, (req, res) => {
  // Pull story ID out of the URL params
  const { id } = req.params;

  ops.getById(res, Stories.getById, 'Story', id);
});

/**
 * @swagger
 * /story:
 *  post:
 *    summary: Attempts to add a new story to the database.
 *    security:
 *      - okta: []
 *    tags:
 *      - Stories
 *    requestBody:
 *      description: Object to be added to the Stories table.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostStory'
 *    responses:
 *      201:
 *        description: Returns the ID of the newly created story.
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
router.post('/', authRequired, storyValidation, async (req, res) => {
  // Pull relevant data out of the request object
  const newStory = req.body;

  ops.post(res, Stories.add, 'Story', newStory);
});

/**
 * @swagger
 * /story/{id}:
 *  put:
 *    summary: Attempts to update the story with the given ID parameter.
 *    security:
 *      - okta: []
 *    tags:
 *      - Stories
 *    parameters:
 *      - $ref: '#/components/parameters/storyId'
 *    requestBody:
 *      description: Changes to be applied to the specified story.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Story'
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
router.put('/:id', authRequired, storyUpdateValidation, (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const changes = req.body;

  ops.update(res, Stories.update, 'Story', id, changes);
});

/**
 * @swagger
 * /story/{id}:
 *  delete:
 *    summary: Attempts to delete the story with the specified ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Stories
 *    parameters:
 *      - $ref: '#/components/parameters/storyId'
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
  // Pull story ID out of the URL params
  const { id } = req.params;

  ops.update(res, Stories.remove, 'Story', id);
});

module.exports = router;
