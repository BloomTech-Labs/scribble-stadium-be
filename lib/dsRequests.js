/* istanbul ignore file */
const { default: Axios } = require('axios');
const config = require('../config/dsConfig');

const client = Axios.create(config);

/**
 * This function uploads an array of written pages to the DS api
 * @param {Number} storyId the integer ID of the relevant story
 * @param {Number} subId the integer ID of the relevant submission
 * @param {Array} pages an array of pages that has been processed by the S3 middleware
 * @returns {Promise} returns a promise that resolves to the response from the DS api
 */
const submitWritingToDS = (storyId, subId, pages) => {
  // Parse the data into the format required by DS
  const data = { storyId, subId, pages: {} };
  pages.forEach(({ PageNum, URL, checksum }) => {
    data.pages[PageNum] = { URL, checksum };
  });
  return client.post('/submission/text', data);
  // return Promise.resolve(data);
};

/**
 * This function uploads an image to the DS api
 * @param {Object} image the image object after being processed by the S3 middleware
 * @returns {Promise} returns a promise that resolves to the response from the DS api
 */
const submitDrawingToDS = (image) => {
  return client.post('/submission/illustration', image);
  // return Promise.resolve(image);
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
};
