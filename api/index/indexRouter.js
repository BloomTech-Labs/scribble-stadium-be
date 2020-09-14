var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    summary: Pings the api to check its status.
 *    tags:
 *      - Status
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Returns a timestamp on success.
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
