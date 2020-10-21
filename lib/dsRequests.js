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
const submitWritingToDS = (StoryId, SubmissionID, pages) => {
  // Parse the data into the format required by DS
  const data = { StoryId, SubmissionID: parseInt(SubmissionID), Pages: {} };
  pages.forEach(({ PageNum, URL, checksum }) => {
    data.Pages[PageNum] = { URL, Checksum: checksum };
  });
  return client.post('/submission/text', data);
};

/**
 * This function uploads an image to the DS api
 * @param {Object} image the image object after being processed by the S3 middleware
 * @returns {Promise} returns a promise that resolves to the response from the DS api
 */
const submitDrawingToDS = (image) => {
  return client.post('/submission/illustration', image);
};

/**
 * This function sends submissions to the DSAPI for clustering
 * @param {Object} submissions a specially-formatted object that contains submissions grouped by cohort
 * @returns {Promise} a promise that resolves to the newly clustered children
 */
const getClusters = (submissions) => {
  return client.post('/cluster', submissions);
};

module.exports = {
  submitWritingToDS,
  submitDrawingToDS,
  getClusters,
};
