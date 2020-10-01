// const { default: Axios } = require('axios');
// const config = require('../config/dsConfig');

// const client = Axios.create(config);

const submitWritingToDS = (storyId, subId, pages) => {
  // Parse the data into the format required by DS
  const data = { storyId, subId, pages: {} };
  pages.forEach(({ PageNum, URL, checksum }) => {
    data.pages[PageNum] = { URL, checksum };
  });
  console.log('-> SENDING PAGES TO DS: ', data);
  return Promise.resolve();
};

const submitDrawingToDS = (image) => {
  // return client.post('/submission/image', image);
  console.log('-> SENDING DRAWING TO DS: ', image);
  return Promise.resolve();
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
};
