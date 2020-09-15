const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const GradeLevels = require('./gradeLevelModel');
const { gradeLevelValidation } = require('../middleware/gradeLevelValidation');

/**
 * Schemas for grade level types.
 * @swagger
 * components:
 *  schemas:
 *    GradeLevel:
 *      type: object
 *      properties:
 *        GradeLevel:
 *          type: string
 *          description: String containing current student grade level
 *      example:
 *        GradeLevel: '3'
 *    PostGradeLevel:
 *      allOf:
 *        - $ref: '#/components/schemas/GradeLevel'
 *        - type: object
 *          required:
 *            - GradeLevel
 *    GetGradeLevel:
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
 *        - $ref: '#/components/schemas/PostGradeLevel'
 */

/**
 * @swagger
 * /gradelevels:
 *  get:
 *    summary: Attempts to query the database for a list of all grade levels.
 *    security:
 *      - okta: []
 *    tags:
 *      - Grade Levels
 *    responses:
 *      200:
 *        description: Returns an array of all grade levels in the database.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/GetGradeLevel'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const gradeLevels = await GradeLevels.getAll();
    res.status(200).json(gradeLevels);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

/**
 * @swagger
 * /gradelevel:
 *  post:
 *    summary: Attempts to add a new grade level to the database.
 *    security:
 *      - okta: []
 *    tags:
 *      - Grade Levels
 *    requestBody:
 *      description: Object to be added to the GradeLevels table. An array of gradeLevel objects can also be sent.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostGradeLevel'
 *    responses:
 *      201:
 *        description: Returns the ID of the newly created grade level.
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
router.post('/', authRequired, gradeLevelValidation, async (req, res) => {
  const gradeLevel = req.body;
  try {
    const IDs = await GradeLevels.add(gradeLevel);
    res.status(201).json(IDs);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
