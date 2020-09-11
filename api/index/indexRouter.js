var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: root path returning status
 *    tags:
 *      - status
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: server is up
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - api
 *                - timestamp
 *              properties:
 *                api:
 *                  type: boolean
 *                  example: true
 *                timestamp:
 *                  type: number
 *                  example: 1599853832394
 */
router.get('/', function (req, res) {
  res.status(200).json({ api: 'up', timestamp: Date.now() });
});

module.exports = router;
