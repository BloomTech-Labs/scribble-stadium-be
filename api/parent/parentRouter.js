const express = require('express');
const authRequired = require('../middleware/authRequired');
const Parents = require('./parentModel');
const router = express.Router();

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
 *
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
 *                  Name: 'Alison Brie'
 *                  Email: 'allison@br.ie'
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
 * /parent/{id}:
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

// router.get('/:id/profiles', authRequired, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const parent = await Parents.findById(id);
//     const children = await Parents.getProfiles(id);

//     // const profiles = data.map((child) => ({
//     //   Name: child.Name,
//     //   PIN: child.PIN,
//     // }));
//     // profiles.push({})
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

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
 *            $ref: '#components/schemas/Parent'
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
