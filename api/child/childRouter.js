const router = require('express').Router();

const {
  authRequired,
  childValidation,
  childUpdateValidation,
} = require('../middleware');
const { ops } = require('../../lib/');

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
 *      example:
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        IsDyslexic: false
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
  ops.getAll(res, Children.getAll, 'Child');
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
  const { id } = req.params;
  ops.getById(res, Children.getById, 'Child', id);
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
  const newChild = req.body;
  ops.post(res, Children.add, 'Child', newChild);
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
  const { id } = req.params;
  const childChanges = req.body;
  ops.put(res, Children.update, 'Child', id, childChanges);
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
  const { id } = req.params;
  ops.deleteById(res, Children.remove, 'Child', id);
});

module.exports = router;
