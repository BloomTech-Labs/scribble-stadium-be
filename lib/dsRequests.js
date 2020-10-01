// const { default: Axios } = require('axios');
// const config = require('../config/dsConfig');

// const client = Axios.create(config);

const submitWritingToDS = (storyId, pages) => {
  // Parse the data into the format required by DS
  const data = { storyId, subId: pages[0].SubmissionID, pages: {} };
  pages.forEach(({ PageNum, URL, checksum }) => {
    data.pages[PageNum] = { URL, checksum };
  });
  try {
    console.log('-> SENDING PAGES TO DS: ', data);
    // return client.post('/submission/text', data);
  } catch (err) {
    console.log(err);
  }
};

const submitDrawingToDS = (image) => {
  try {
    // return client.post('/submission/image', image);
    console.log('-> SENDING DRAWING TO DS: ', image);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
};
