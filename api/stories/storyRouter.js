const router = require('express').Router();
const Stories = require('./storyModel');
const authRequired = require('../middleware/authRequired');
const {
  storyValidation,
  storyUpdateValidation,
} = require('../middleware/storyValidation');

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
 */

/**
 * @swagger
 * /stories:
 *  get:
 *    summary: Returns the current week's story ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Stories
 *    responses:
 *      200:
 *        description: Returns the ID of the current week's story.
 *        content:
 *          application/json:
 *            schema:
 *              type: integer
 *              example: 1
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res) => {
  res.status(200).json(1);
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
router.get('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Stories.getById(id);
    if (story.length > 0) {
      res.status(200).json(story[0]);
    } else {
      res.status(404).json({ error: 'StoryNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
  const story = req.body;
  try {
    const [ID] = await Stories.add(story);
    res.status(201).json({ ID });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
router.put('/:id', authRequired, storyUpdateValidation, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await Stories.update(id, changes);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'StoryNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
router.delete('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Stories.remove(id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'StoryNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
