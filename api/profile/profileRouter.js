const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Parents = require('../parent/parentModel');

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
 *                  AvatarID: 1
 *                  ParentID: 1
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

module.exports = router;
