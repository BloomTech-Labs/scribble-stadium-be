/* istanbul ignore file */
const AWS = require('aws-sdk');
const bluebird = require('bluebird');

// hashing library
const crypto = require('crypto');

// Grab the keys from external config file
const { config } = require('../config/aws').s3;
AWS.config.update(config);

// Configure AWS to have consistent promise resolution
AWS.config.setPromisesDependency(bluebird);

// Create S3 Instance
const s3 = new AWS.S3();

/**
 * A specialized function to handle file upload to an S3 bucket
 * @param {Buffer} buffer file stream buffer
 * @param {String} name file name string
 * @param {String} type file stype string
 * @returns {Promise} returns a promise that resolves to the uploaded file data on success
 */
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

/**
 * This function generates a checksum based off of a filestream buffer
 * @param {Buffer} str a filestream buffer
 * @param {String} algorithm a string representation of an algorithm name
 * @param {String} encoding a string representation of the base used to encode the checksum
 */
const generateChecksum = (str, algorithm = 'sha512', encoding = 'hex') => {
  return crypto.createHash(algorithm).update(str, 'utf8').digest(encoding);
};

module.exports = {
  uploadFile,
  generateChecksum,
};
