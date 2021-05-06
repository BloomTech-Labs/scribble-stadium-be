const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Parents = require('../parent/parentModel');

const { crudOperationsManager } = require('../../lib');

/**
 * Schemas for typed profiles.
 * @swagger
 * components:
 *  schemas:
 *    TypedChild:
 *      allOf:
 *        - $ref: '#/components/schemas/GetChild'
 *        - type: object
 *          required:
 *            - type
 *          properties:
 *            type:
 *              type: string
 *      example:
 *        type: 'Child'
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
 *  parameters:
 *    token:
 *      name: Authorization
 *      in: headers
 *      required: true
 *      example: '`Bearer ${idToken}`'
 *      schema:
 *        type: Bearer Token
 */

/**
 * @swagger
 * /profiles:
 *  get:
 *    summary: Attempts to query the database for all profiles connected to a parent account.
 *    description:
 *      This endpoint pulls the user's email from the Authorization header. Using the email,
 *      it queries the database to find all children connected to the parent's account.
 *      <br /><br />
 *      This endpoint should rarely ever throw an error. You will get a 401 unauthorized
 *      if you don't pass in an Authorization header, and you will get a 500 error if there
 *      is ever an issue with the database, but due to the nature of the auth middleware,
 *      you should never get a 404 error. That's basically just there as another layer of
 *      error handling.
 *    security:
 *      - okta: []
 *    tags:
 *      - Profiles
 *    parameters:
 *      - $ref: '#/components/parameters/token'
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
 *                  AvatarURL: 'http://someurl.com'
 *                  GradeLevel: 3
 *                  ParentID: 1
 *                  CohortID: 1
 *                  IsDyslexic: false
 *                  type: 'Child'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, async (req, res) => {
  const { Email } = req.profile;

  crudOperationsManager.getAll(
    res,
    Parents.getProfilesByEmail,
    'Profile',
    Email
  );
});

module.exports = router;
