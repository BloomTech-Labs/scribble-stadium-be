const { default: Axios } = require('axios');
const config = require('../config/dsConfig');

const client = Axios.create(config);

const submitWritingToDS = (storyId, subId, pages) => {
  return client.post('/submission/text', {
    subId,
    storyId,
    pages,
  });
};

const submitDrawingToDS = (image) => {
  return client.post('/submission/image', image);
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
};
