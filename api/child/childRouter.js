const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Children = require('./childModel');

/**
 * @swagger
 * /children:
 *  get:
 *    description: Returns a list of children
 *    summary: Get a list of all child profiles
 *    security:
 *      - okta: []
 *    tags:
 *      - child
 *    responses:
 *      200:
 *        description: array of all children
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Child'
 *              example:
 *                - ID: 1
 *                  Name: 'Alison Brie'
 *                  PIN: '1jkkj0f89n2083n9fnq23rbf'
 *                  AvatarID: 1
 *                  ParentID: 1
 *                - ID: 2
 *                  Name: 'Gillian Jacobs'
 *                  PIN: '1jkkj0f89n2083n9fnq23rba'
 *                  AvatarID: 2
 *                  ParentID: 1
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const children = await Children.findAll();
    res.status(200).json(children);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    childId:
 *      name: ID
 *      in: path
 *      description: ID of child
 * /children/{id}:
 *  get:
 *    description: Find children by ID
 *    summary: Returns a single child object
 *    security:
 *      - okta: []
 *    tags:
 *      - child
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: A child object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostChild'
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
    const child = await Children.findById(id);
    if (child.length > 0) {
      res.status(200).json(child[0]);
    } else {
      res.status(404).json({ error: 'ChildNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /child:
 *  post:
 *    summary: Add a new child
 *    security:
 *      - okta: []
 *    tags:
 *      - child
 *    requestBody:
 *      description: Child object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostChild'
 *    responses:
 *      201:
 *        description: The ID of the newly created child
 *        content:
 *          application/json:
 *            example: 1
 *            schema:
 *              $ref: '#/components/parameters/childId'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/', authRequired, async (req, res) => {
  const child = req.body;
  try {
    const data = await Children.add(child);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /child/{id}:
 *  put:
 *    summary: Update a child's info
 *    security:
 *      - okta: []
 *    tags:
 *      - child
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    requestBody:
 *      description: Changes to be applied to the given child
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Child'
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
    const count = await Children.update(id, changes);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ChildNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /child/{id}:
 *  delete:
 *    summary: Remove a child account
 *    security:
 *      - okta: []
 *    tags:
 *      - child
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
