const router = require('express').Router();

const { authRequired, gradeLevelValidation } = require('../middleware');
const { ops } = require('../../lib');

const GradeLevels = require('./gradeLevelModel');

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
router.get('/', authRequired, (req, res) => {
  ops.getAll(res, GradeLevels.getAll, 'GradeLevel');
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
 *      403:
 *        $ref: '#/components/responses/DuplicateError'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/', authRequired, gradeLevelValidation, (req, res) => {
  const newGrades = req.body;

  ops.postMult(res, GradeLevels.add, 'GradeLevel', newGrades);
});

module.exports = router;
