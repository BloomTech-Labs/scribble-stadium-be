const router = require('express').Router();

const {
  authRequired,
  parentValidation,
  parentUpdateValidation,
} = require('../middleware');
const { ops } = require('../../lib');

const Parents = require('./parentModel');

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
 * /parent/viz?childId={id}:
 *  get:
 *    summary: gets a Plotly line graph object for a child's squad score over time
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: A plotly graph object whose property values can be passed into plotly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  description: plug this into the "data" attribute of the plotly component
 *                layout:
 *                  type: object
 *                  description: plug this into the "layout" attribute of the plotly component
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/viz', authRequired, (req, res) => {
  const childId = req.query.childId;

  ops.getAll(res, Parents.getVisualizations, 'Child', childId);
});

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
router.get('/', authRequired, (req, res) => {
  ops.getAll(res, Parents.getAll, 'Parent');
});

/**
 * @swagger
 * /parents/{id}:
 *  get:
 *    summary: Attempts to query the database for a parent with the given ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    parameters:
 *      - $ref: '#/components/parameters/parentId'
 *    responses:
 *      200:
 *        description: Returns the requested parent object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetParent'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/:id', authRequired, (req, res) => {
  // Pull parent ID data out of the URL params
  const { id } = req.params;

  ops.getById(res, Parents.getById, 'Parent', id);
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
 *      403:
 *        $ref: '#/components/responses/DuplicateError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/', authRequired, parentValidation, async (req, res) => {
  // Pull relevant data out of the request object
  const newParent = req.body;

  ops.post(res, Parents.add, 'Parent', newParent);
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
router.put('/:id', authRequired, parentUpdateValidation, (req, res) => {
  // Pull relevant data out of the request object
  const { id } = req.params;
  const changes = req.body;

  ops.update(res, Parents.update, 'Parent', id, changes);
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
router.delete('/:id', authRequired, (req, res) => {
  // Pull submission ID out of the URL parameter
  const { id } = req.params;

  ops.update(res, Parents.remove, 'Parent', id);
});

module.exports = router;
