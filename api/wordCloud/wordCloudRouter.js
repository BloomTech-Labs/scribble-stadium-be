const { default: axios } = require('axios');
const wordCloudRouter = require('express').Router();

wordCloudRouter.get('/', async (req, res, next) => {
  try {
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
