const router = require('express').Router();

const { dsAuthMiddleware } = require('../middleware');
const { ops } = require('../../lib');

const DS = require('./dsModel');

router.put('/flag/:id', dsAuthMiddleware, async (req, res) => {
  // this endpoint exists to flag submissions for review
  res.status(204).end();
});

/**
 * @swagger
 * /parent/{id}:
 *  put:
 *    summary: Attempts to update the parent with the given ID parameter.
 *    security:
 *      - okta: []
 *    tags:
 *      - Parents
 *    parameters:
 *      - $ref: '#/components/parameters/parentId'
 *    requestBody:
 *      description: Changes to be applied to the specified parent.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Parent'
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
router.put('/complexity/:id', dsAuthMiddleware, async (req, res) => {
  // Allows the data science team to set a complexity store on a submission
  const { id } = req.params;
  const data = req.query.complexity;

  ops.put(res, DS.setComplexity, 'Submission', id, data);
});

router.get('/complexity/:id', dsAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  ops.getAll(res, DS.getComplexitiesByChild, 'Submission', id);
});

module.exports = router;
