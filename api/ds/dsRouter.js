const router = require('express').Router();
const DS = require('./dsModel');

router.put('/flag/:id', async (req, res) => {
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
router.put('/complexity/:id', async (req, res) => {
  // Allows the data science team to set a complexity store on a submission
  if (!req.query.complexity) {
    return res.status(400).json({ error: 'No score provided.' });
  }
  const { id } = req.params;
  const { complexity } = req.query;
  try {
    const count = await DS.setComplexity(id, complexity);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'SubmissionNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/complexity/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const complexities = await DS.getComplexitiesByChild(id);
    if (complexities.length > 0) {
      res.status(200).json(complexities);
    } else {
      res.status(404).json({ error: 'NoSubmissionsFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
