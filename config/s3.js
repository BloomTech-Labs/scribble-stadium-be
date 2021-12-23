require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,

})

// upload file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const filename = process.env.NODE_ENV + "/" + file.filename
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename

    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

// gets file from s3 bucket
function fetchFileStream(fileKey) {
    const fetchParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(fetchParams).createReadStream()
}
exports.fetchFileStream = fetchFileStream