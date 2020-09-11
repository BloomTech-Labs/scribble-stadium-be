const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Parents = require('./parentModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Parent:
 *      type: object
 *      required:
 *        - ID
 *        - Name
 *        - Email
 *        - PIN
 *      properties:
 *        ID:
 *          type: integer
 *          description: This is an auto-incrementing primary key
 *        Name:
 *          type: string
 *        Email:
 *          type: string
 *        PIN:
 *          type: string
 *          description: This is a hashed 4-digit PIN
 *      example:
 *        ID: '1'
 *        Name: 'Danny Pudi'
 *        Email: 'danny@pu.di'
 *        PIN: '00uhjfrwdWAQvD8JV4x6'
 *    TypedParent:
 *      allOf:
 *        - $ref: '#/components/schemas/Parent'
 *        - type: object
 *          required:
 *            - type
 *          properties:
 *            type:
 *              type: string
 *      example:
 *        ID: '1'
 *        Name: 'Danny Pudi'
 *        Email: 'danny@pu.di'
 *        PIN: '00uhjfrwdWAQvD8JV4x6'
 *        type: 'Parent'
 * /parents:
 *  get:
 *    description: Returns a list of parents
 *    summary: Get a list of all registered parents
 *    security:
 *      - okta: []
 *    tags:
 *      - parent
 *    responses:
 *      200:
 *        description: array of all parents
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Parent'
 *              example:
 *                - ID: '1'
 *                  Name: 'Danny Pudi'
 *                  Email: 'danny@pu.di'
 *                  PIN: '00uhjfrwdWAQvD8JV4x6'
 *                - ID: '2'
 *                  Name: 'Yvette Nicole-Brown'
 *                  Email: 'yvette@nic.brn'
 *                  PIN: '00uhjfrwdWAQv34JV4x6'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const parents = await Parents.findAll();
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    parentId:
 *      name: ID
 *      in: path
 *      description: ID of the desired parent
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 *
 * /parents/{id}:
 *  get:
 *    description: Find parents by ID
 *    summary: Returns a single parent object
 *    security:
 *      - okta: []
 *    tags:
 *      - parent
 *    parameters:
 *      - $ref: '#/components/parameters/parentId'
 *    responses:
 *      200:
 *        description: A parent object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Parent'
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
    const parent = await Parents.findById(id);
    if (parent.length > 0) {
      res.status(200).json(parent[0]);
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Child:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *          readOnly: true
 *          description: Auto-incrementing primary key
 *        Name:
 *          type: string
 *        PIN:
 *          type: string
 *        AvatarID:
 *          type: integer
 *          description: Foreign key to the Avatars table
 *        ParentID:
 *          type: integer
 *          readOnly: true
 *          description: Foreign key to the Parents table. Can't be updated!
 *      example:
 *        ID: '1'
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        AvatarID: 1
 *        ParentID: 1
 *    TypedChild:
 *      allOf:
 *        - $ref: '#/components/schemas/Child'
 *        - type: object
 *          required:
 *            - Name
 *            - PIN
 *            - AvatarID
 *            - ParentID
 *            - type
 *          properties:
 *            type:
 *              type: string
 *      example:
 *        ID: '1'
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        AvatarID: 1
 *        ParentID: 1
 *        type: 'Child'
 *    PostChild:
 *      allOf:
 *        - $ref: '#/components/schemas/Child'
 *        - type: object
 *          required:
 *            - Name
 *            - PIN
 *            - AvatarID
 *            - ParentID
 *          properties:
 *            ParentID:
 *              type: integer
 *              readOnly: false
 *              description: Foreign key to the Parents table. Can't be updated!
 *
 *      example:
 *        ID: 1
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        AvatarID: 1
 *        ParentID: 1
 *
 * /parents/{id}/profiles:
 *  get:
 *    description: Return a list of parents and children
 *    summary: Get a list of all profiles for a given parent account
 *    security:
 *      - okta: []
 *    tags:
 *      - parent
 *    responses:
 *      200:
 *        description: array of all profiles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                anyOf:
 *                  - $ref: '#/components/schemas/TypedParent'
 *                  - $ref: '#/components/schemas/TypedChild'
 *              example:
 *                - ID: '1'
 *                  Name: 'Danny Pudi'
 *                  Email: 'danny@pu.di'
 *                  PIN: '00uhjfrwdWAQvD8JV4x6'
 *                  type: 'Parent'
 *                - ID: '1'
 *                  Name: 'Alison Brie'
 *                  Email: 'allison@br.ie'
 *                  PIN: '00uhjfrwdWAQv10JV4x6'
 *                  type: 'Child'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/:id/profiles', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parents.findById(id);
    if (parent.length === 0) {
      return res.status(404).json({ error: 'ParentNotFound' });
    }

    // If we find a parent, then look for the children
    const children = await Parents.getChildren(id);
    res
      .status(200)
      .json([
        { ...parent[0], type: 'Parent' },
        ...children.map((child) => ({ ...child, type: 'Child' })),
      ]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /parent:
 *  post:
 *    summary: Add a new parent account
 *    security:
 *      - okta: []
 *    tags:
 *      - parent
 *    requestBody:
 *      description: Parent object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Parent'
 *    responses:
 *      201:
 *        description: The ID of the newly created profile
 *        content:
 *          application/json:
 *            example: 1
 *            schema:
 *              type: integer
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/', authRequired, async (req, res) => {
  const parent = req.body;
  try {
    const data = await Parents.add(parent);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /parent:
 *  put:
 *    summary: Update a parent's info
 *    security:
 *      - okta: []
 *    tags:
 *      - parent
 *    requestBody:
 *      description: Parent object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Parent'
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
router.put('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await Parents.update(id, changes);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /parent/{id}:
 *  delete:
 *    summary: Remove a parent account
 *    security:
 *      - okta: []
 *    tags:
 *      - parent
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
