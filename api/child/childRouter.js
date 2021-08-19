const router = require('express').Router();

const {
  authRequired,
  childValidation,
  childUpdateValidation,
} = require('../middleware');
const { crudOperationsManager } = require('../../lib/');

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
 *        CohortID:
 *          type: integer
 *          description: Foreign key to child's current cohort
 *      example:
 *        Name: 'Alison Brie'
 *        PIN: '00uhjfrwdWAQv10JV4x6'
 *        IsDyslexic: false
 *        CohortID: 1
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
  crudOperationsManager.getAll(res, Children.getAll, 'Child');
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

//!!put authRequired back before pull request!!
// router.get('/:id', authRequired, (req, res) => {
router.get('/:id', (req, res) => {
  // Pull child ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getById(res, Children.getById, 'Child', id);
});

/**
 * @swagger
 * /child/{id}/complexity:
 *  get:
 *    summary: Attempts to query the database for the complexity ratings of a child with the given ID.
 *    security:
 *      - okta: []
 *    tags:
 *      - Children
 *    parameters:
 *      - $ref: '#/components/parameters/childId'
 *    responses:
 *      200:
 *        description: Returns an array of complexities from the database.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Complexity'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/:id/complexity', authRequired, async (req, res) => {
  // Pull the relevant child ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.getAll(res, Children.getComplexityList, 'Child', id);
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
  // Pull relevant data out of the request object
  const newChild = req.body;

  crudOperationsManager.post(res, Children.add, 'Child', newChild);
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
  // Pull relevant data out of the request object
  const { id } = req.params;
  const changes = req.body;

  crudOperationsManager.update(res, Children.update, 'Child', id, changes);
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
  // Pull child ID out of the URL params
  const { id } = req.params;

  crudOperationsManager.update(res, Children.remove, 'Child', id);
});

module.exports = router;
