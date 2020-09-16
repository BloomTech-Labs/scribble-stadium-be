const S3 = require('aws-sdk').S3;

const { config } = require('../config/aws').s3;
const bucket = new S3(config);

const params = (key, file) => ({
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: key,
  Body: JSON.stringify(file, null, 2),
});

const upload = (key, file) => {
  bucket.upload(params(key, file), (err, data) => {
    if (err) throw err;
    console.log(`File uploaded successfully at ${data.location}`);
  });
};

module.exports = {
  upload,
};
