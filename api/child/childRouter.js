const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Children = require('./childModel');
const {
  childValidation,
  childUpdateValidation,
} = require('../middleware/childValidation');

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
 *        AvatarURL:
 *          type: string
 *          description: URL pulled from from foreign Avatars table
 *        GradeLevel:
 *          type: string
 *          description: Grade level pulled from foreign GradeLevels table
 *      example:
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        IsDyslexic: false
 *        AvatarURL: 'http://www.someurl.com'
 *        GradeLevel: '3'
 *    PostChild:
 *      allOf:
 *        - $ref: '#/components/schemas/Child'
 *        - type: object
 *          required:
 *            - Name
 *            - PIN
 *            - IsDyslexic
 *            - AvatarURL
 *            - GradeLevel
 *            - ParentID
 *          properties:
 *            ParentID:
 *              type: integer
 *              description: Foreign key to the Parents table.
 *          example:
 *            ParentID: 1
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
 *          example:
 *            ID: '1'
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
router.get('/', authRequired, async (req, res) => {
  try {
    const children = await Children.getAll();
    res.status(200).json(children);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
router.get('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const child = await Children.getById(id);
    if (child.length > 0) {
      res.status(200).json(child[0]);
    } else {
      res.status(404).json({ error: 'ChildNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
router.post('/', authRequired, childValidation, async (req, res) => {
  const child = req.body;
  try {
    const [ID] = await Children.add(child);
    res.status(201).json(ID);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
 *            $ref: '#/components/schemas/Child'
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
router.put('/:id', authRequired, childUpdateValidation, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await Children.update(id, changes);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ChildNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
router.delete('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Children.remove(id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ChildNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
