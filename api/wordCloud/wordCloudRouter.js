const { default: axios } = require('axios');

const wordCloudRouter = require('express').Router();

wordCloudRouter.get('/api/wordcloud', async (req, res) => {
  try {
    const res = await axios.post(process.env.WORDCLOUD_URL, {
      headers: {
        Authorization: `${process.env.DS_SECRET_TOKEN}`,
      },
      body: {
        user_id: 'XiChi',
        data_range: ['2019-06-16', '2020-10-23'],
        complexity_metric: 'syl',
        image_format: '.webp',
        canvas_width: 960,
        density: 0.4,
        max_words: 200,
      },
    });
    res.send(res.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

// auth(user, pass){
//     return axios.post('http://localhost:3000/auth', {
//         username: user,
//         password: pass
//     })
// }

// const token = '..your token..'

// axios.post(url, {
//   //...data
// }, {
//   headers: {
//     'Authorization': `Basic ${token}`
//   }
// })

// axios.post(process.env.WORDCLOUD_URL, {
//     headers: {
//       Authorization: `${process.env.WORDCLOUD_TOKEN}`
//     }
//   }).then(/*Send data to DB using Model Function CREATE*/).catch(err => /*Send Err to FE */)

module.exports = wordCloudRouter;
