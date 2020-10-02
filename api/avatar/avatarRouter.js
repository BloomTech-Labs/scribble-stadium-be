const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Avatars = require('./avatarModel');
const fileUploadHandler = require('../middleware/fileUpload');
const { avatarValidation } = require('../middleware/avatarValidation');
const { getAll, postVariableLength } = require('../../lib/crudOps');

/**
 * Schemas for avatar types.
 * @swagger
 * components:
 *  schemas:
 *    Avatar:
 *      type: object
 *      properties:
 *        AvatarURL:
 *          type: string
 *          description: URL pointing to the hosted location of avatar SVG file.
 *      example:
 *        AvatarURL: 'http://www.someurl.com'
 *    GetAvatar:
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
 *        - $ref: '#/components/schemas/PostAvatar'
 */

/**
 * @swagger
 * /avatars:
 *  get:
 *    summary: Attempts to query the database for a list of all avatars.
 *    security:
 *      - okta: []
 *    tags:
 *      - Avatars
 *    responses:
 *      200:
 *        description: Returns an array of all avatars in the database.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetAvatar'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, (req, res) => {
  getAll(req, res, Avatars);
});

/**
 * @swagger
 * /avatar:
 *  post:
 *    summary: Attempts to add a new avatar to the database.
 *    security:
 *      - okta: []
 *    tags:
 *      - Avatars
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: formData
 *        name: avatars
 *        type: file
 *        description: The avatar file to upload, or an array of avatar files
 *    responses:
 *      201:
 *        description: Returns the ID(s) of the newly created avatar(s).
 *        content:
 *          application/json:
 *            example: 1
 *            schema:
 *              type: integer
 *      400:
 *        $ref: '#/components/responses/InvalidFormat'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      409:
 *        $ref: '#/components/responses/UploadFailed'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post(
  '/',
  authRequired,
  fileUploadHandler,
  avatarValidation,
  async (req, res) => {
    const avatars = req.body.avatars.map((x) => ({
      AvatarURL: x.Location,
    }));
    req.body = avatars;
    postVariableLength(req, res, Avatars);
  }
);

module.exports = router;
