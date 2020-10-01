// const { default: Axios } = require('axios');
// const config = require('../config/dsConfig');

// const client = Axios.create(config);

const submitWritingToDS = (storyId, subId, pages) => {
  // Parse the data into the format required by DS
  const data = { storyId, subId, pages: {} };
  pages.forEach(({ PageNum, URL, checksum }) => {
    data.pages[PageNum] = { URL, checksum };
  });
  return Promise.resolve();
};

const submitDrawingToDS = (image) => {
  // return client.post('/submission/image', image);
  return Promise.resolve(image);
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
};
