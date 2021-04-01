const router = require('express').Router();

const { authRequired, validateUpdateAllTasksParams } = require('../middleware');
const { crudOperationsManager } = require('../../lib');
const DevModel = require('./devModeModel');


/**
 * @swagger
 * /submit/update-all/{id}:
 *  put:
 *    summary: Attempts to mark the submission with the given ID as hasRead as 'false', hasWritten as 'false', hasDrawn as 'false'
 *    security:
 *      - okta: []
 *    tags:
 *      - Submissions
 *    parameters:
 *      - $ref: '#/components/parameters/submissionId'
 *      - in: formData
 *        name: hasRead
 *        type: boolean
 *        description: boolean to set users task hasRead to
 *      - in: formData
 *        name: hasDrawn
 *        type: boolean
 *        description: boolean to set users task hasDrawn to
*      - in: formData
 *        name: hasWritten
 *        type: boolean
 *        description: boolean to set users task hasWritten to
 *    responses:
 *      204:
 *        $ref: '#/components/responses/EmptySuccess'
 *      400:
 *        description: Invalid request missing/invalid arguments
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Required inputs hasRead, hasDrawn, and hasWritten must be of boolean type
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/DatabaseError'
 */
router.put('/update-all/:id', authRequired, validateUpdateAllTasksParams, async (req, res) => {
    const { id } = req.params;
    const { hasRead, hasDrawn, hasWritten } = req.body;
  
    return crudOperationsManager.update(res, DevModel.updateAll, 'Submission', id, hasRead, hasDrawn, hasWritten);
  })

  module.exports = router;