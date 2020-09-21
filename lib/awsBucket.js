const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const fileType = require('file-type');
const fs = require('fs');

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

const bodyParser = (req) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);

    const path = files.file[0].path;
    const buffer = fs.readFileSync(path);
    const type = await fileType.fromBuffer(buffer);
    const timestamp = Date.now().toString();
    const fileName = `bucketFolder/${timestamp}-lg`;

    return uploadFile(buffer, fileName, type);
  });
};

module.exports = {
  uploadFile,
};
