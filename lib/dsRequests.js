const { default: Axios } = require('axios');
const config = require('../config/dsConfig');

const client = Axios.create(config);

const submitWritingToDS = (storyId, subId, pages) => {
  const data = { storyId, subId, pages: {} };
  pages.forEach(({ PageNum, URL, checksum }) => {
    data.pages[PageNum] = { URL, checksum };
  });
  return client.post('/submission/text', data);
};

const submitDrawingToDS = (image) => {
  return client.post('/submission/image', image);
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
};
