const router = require('express').Router();
const Stories = require('./storyModel');
const authRequired = require('../middleware/authRequired');
const {
  storyValidation,
  storyUpdateValidation,
} = require('../middleware/storyValidation');

/**
 * @swagger
 * components:
 *  schemas:
 *    Story:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *          readOnly: true
 *          description: Auto-incrementing primary key
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
 *        ID: 1
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
 * /stories:
 *  get:
 *    description: Get a list of all stories in the database
 *    summary: Returns a list of all stories from the database
 *    security:
 *      - okta: []
 *    tags:
 *      - story
 *    responses:
 *      200:
 *        description: array of all stories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Story'
 *              example:
 *                - ID: 1
 *                  Title: 'Studies in Modern Movement'
 *                  URL: 'http://www.someurl.com'
 *                  WritingPrompt: 'Write something about the story you just read.'
 *                  DrawingPrompt: 'Draw something that happened in the story you just read.'
 *                - ID: 2
 *                  Title: 'Advanced Documentary Filmmaking'
 *                  URL: 'http://www.someurl.com'
 *                  WritingPrompt: 'Write something about the story you just read.'
 *                  DrawingPrompt: 'Draw something that happened in the story you just read.'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const stories = await Stories.getAll();
    res.status(200).json(stories);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    storyId:
 *      name: ID
 *      in: path
 *      description: The unique ID of a story object
 *      example: 1
 *      schema:
 *        type: integer
 *
 * /stories/{id}:
 *  get:
 *    description: Searches the database for a specific story
 *    summary: Query the database for a story with the given ID
 *    security:
 *      - okta: []
 *    tags:
 *      - story
 *    parameters:
 *      - $ref: '#/components/parameters/storyId'
 *    responses:
 *      200:
 *        description: A story object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Story'
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
 *    description: Add a story to the database
 *    summary: Attempts to post a new story and returns the new ID on success
 *    security:
 *      - okta: []
 *    tags:
 *      - story
 *    requestBody:
 *      description:  Story object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostStory'
 *    responses:
 *      201:
 *        description: The ID of the newly created story
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
 * /story:
 *  put:
 *    description: Updates the story in the database with the given ID
 *    summary: Attempts to update the story with the given ID
 *    security:
 *      - okta: []
 *    tags:
 *      - story
 *    parameters:
 *      - $ref: '#/components/parameters/storyId'
 *    requestBody:
 *      description: Changes to be applied to the given story
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
 * /story:
 *  delete:
 *    description: Deletes the story in the database with the given ID
 *    summary: Attempts to delete the story with the given ID
 *    security:
 *      - okta: []
 *    tags:
 *      - story
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
