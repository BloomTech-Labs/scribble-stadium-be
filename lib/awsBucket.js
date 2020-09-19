const AWS = require('aws-sdk');
const bluebird = require('bluebird');

const { config } = require('../config/aws').s3;

// Configure AWS Keys
AWS.config.update(config);

// Configure AWS to have consistent promise resolution
AWS.config.setPromisesDependency(bluebird);

// Create S3 Instance
const s3 = new AWS.S3();

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

module.exports = {
  uploadFile,
};
