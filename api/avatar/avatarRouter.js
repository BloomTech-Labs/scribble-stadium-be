const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Avatars = require('./avatarModel');
const { fileUploadHandler } = require('../middleware/fileUpload');

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
 *    PostAvatar:
 *      allOf:
 *        - $ref: '#/components/schemas/Avatar'
 *        - type: object
 *          required:
 *            - AvatarURL
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
router.get('/', authRequired, async (req, res) => {
  try {
    const avatars = await Avatars.getAvatars();
    res.status(200).json(avatars);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
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
 *    requestBody:
 *      description: Object to be added to the Avatars table. An array of avatar objects can also be sent.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostAvatar'
 *    responses:
 *      201:
 *        description: Returns the ID of the newly created avatar.
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
router.post('/', authRequired, fileUploadHandler, async (req, res) => {
  const avatars = req.body.avatars.map((x) => ({
    AvatarURL: x.Location,
  }));
  console.log(avatars);
  try {
    const IDs = await Avatars.add(avatars);
    res.status(201).json(IDs);
  } catch ({ message }) {
    console.log({ message });
    res.status(500).json({ message });
  }
});

module.exports = router;
