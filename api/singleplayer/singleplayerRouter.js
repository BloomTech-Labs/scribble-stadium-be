const router = require('express').Router();

const {authRequired, fileUpload } = require('../middleware');
const { crudOperationsManager } = require('../../lib');
const Singleplayers = require('./singleplayerModel.js').default;
/**
 * @swagger
 * /singleplayer/savebot/{id}:
 *  post:
 *    summary: Attempts to upload a drawing for the submission with the given ID
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - $ref: '#/components/parameters/singleplayerId'
 *      - in: formData
 *        name: drawing
 *        type: file
 *        description: Image of the drawing to upload
 *    responses:
 *      201:
 *        description: Returns the newly uploaded drawing.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/singleplayer'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/DuplicateError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      409:
 *        $ref: '#/components/responses/UploadFailed'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.post('/savebot/:id', authRequired, fileUpload, async (req, res) => {
  // Pull relevant data out of the request object;
  const botdata = req.body; //format for botdata: {botname:string, botstory:string}

  crudOperationsManager.post(res, Singleplayers.add, 'Singleplayer', botdata);
});

module.exports = router;