const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Parents = require('./parentModel');
const {
  parentValidation,
  parentUpdateValidation,
} = require('../middleware/parentValidation');

/**
 * Schemas for parent data types.
 * @swagger
 * components:
 *  schemas:
 *    Parent:
 *      type: object
 *      properties:
 *        Name:
 *          type: string
 *        Email:
 *          type: string
 *        PIN:
 *          type: string
 *      example:
 *        Name: 'Danny Pudi'
 *        Email: 'danny@pu.di'
 *        PIN: '00uhjfrwdWAQvD8JV4x6'
 *    PostParent:
 *      allOf:
 *        - $ref: '#/components/schemas/Parent'
 *        - type: object
 *          required:
 *            - Name
 *            - Email
 *            - PIN
 *    GetParent:
 *      allOf:
 *        - type: object
 *          required:
 *            - ID
 *          properties:
 *            ID:
 *              type: integer
 *              readOnly: true
 *              description: This is an auto-incrementing primary key
 *          example:
 *            ID: 1
 *        - $ref: '#/components/schemas/PostParent'
 *    TypedParent:
 *      allOf:
 *        - $ref: '#/components/schemas/GetParent'
 *        - type: object
 *          required:
 *            - type
 *          properties:
 *            type:
 *              type: string
 *      example:
 *        type: 'Parent'
 *
 *  parameters:
 *    parentId:
 *      name: ID
 *      in: path
 *      description: ID of the desired parent
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 */

/**
 * @swagger
 * /parents:
 *  get:
 *    summary: Attempts to query the database for a list of all parents.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    responses:
 *      200:
 *        description: Returns an array of all parents in the database.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetParent'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const parents = await Parents.getAll();
    res.status(200).json(parents);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

/**
 * @swagger
 * /parents/profiles:
 *  get:
 *    summary: Attempts to query the database for all profiles connected to a parent account.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    parameters:
 *      - $ref: '#/components/parameters/parentId'
 *    responses:
 *      200:
 *        description: Returns an array of all relevant profiles.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: Schema view is bugged on this endpoint. Please see example view for correct structure.
 *              items:
 *                anyOf:
 *                  - $ref: '#/components/schemas/TypedParent'
 *                  - $ref: '#/components/schemas/TypedChild'
 *              example:
 *                - ID: 1
 *                  Name: 'Danny Pudi'
 *                  Email: 'danny@pu.di'
 *                  PIN: '00uhjfrwdWAQvD8JV4x6'
 *                  type: 'Parent'
 *                - ID: 1
 *                  Name: 'Alison Brie'
 *                  PIN: '00uhjfrwdWAQv10JV4x6'
 *                  AvatarID: 1
 *                  ParentID: 1
 *                  type: 'Child'
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/profiles', authRequired, async (req, res) => {
  const { Email } = req.profile;
  try {
    const parent = await Parents.getByEmail(Email);
    if (parent.length === 0) {
      return res.status(404).json({ error: 'ParentNotFound' });
    }
    // If we find a parent, then look for the children
    const children = await Parents.getChildren(parent[0].ID);
    res
      .status(200)
      .json([
        { ...parent[0], type: 'Parent' },
        ...children.map((child) => ({ ...child, type: 'Child' })),
      ]);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

/**
 * @swagger
 * /parent:
 *  post:
 *    summary: Attempts to add a new parent to the database.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    requestBody:
 *      description: Object to be added to the Parents table.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostParent'
 *    responses:
 *      201:
 *        description: Returns the ID of the newly created parent.
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
router.post('/', authRequired, parentValidation, async (req, res) => {
  const parent = req.body;
  try {
    const [ID] = await Parents.add(parent);
    res.status(201).json({ ID });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

/**
 * @swagger
 * /parent/{id}:
 *  put:
 *    summary: Attempts to update the parent with the given ID parameter.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    parameters:
 *      - $ref: '#/components/parameters/parentId'
 *    requestBody:
 *      description: Changes to be applied to the specified parent.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Parent'
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
router.put('/:id', authRequired, parentUpdateValidation, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await Parents.update(id, changes);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

/**
 * @swagger
 * /parent/{id}:
 *  delete:
 *    summary: Attempts to delete the child with the specified ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    parameters:
 *      - $ref: '#/components/parameters/parentId'
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
    const count = await Parents.remove(id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
