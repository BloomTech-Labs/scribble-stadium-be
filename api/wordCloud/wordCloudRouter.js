const { default: axios } = require('axios');
const wordCloudRouter = require('express').Router();

/**
 * @swagger
 * /wordcloud:
 *  get:
 *   summary: Attemps to get the wordcloud gif from the data science API.
 *   security:
 *     - Auth0: []
 *   tags:
 *     - Word Cloud
 *   responses:
 *     200:
 *       description: Returns a URL that is a gif of a wordcloud.
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *              type: string
 *     401:
 *       description: Unauthorized.
 */

wordCloudRouter.get('/', async (req, res, next) => {
  try {
    // assigning result to the POST request to DS API
    const result = await axios.post(
      `${process.env.WORDCLOUD_URL}`,
      {
        user_id: 'XiChi',
      },
      {
        headers: {
          Authorization: `${process.env.DS_SECRET_TOKEN}`,
        },
      }
    );

    res.send(result.data);
  } catch (e) {
    console.log(e);
    next(e.message);
  }
});

module.exports = wordCloudRouter;
