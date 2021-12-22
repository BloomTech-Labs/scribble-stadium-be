require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// const randomBytes = promisify(crypto.randomBytes)
// dotenv.config()


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    //signatureVersion: 'v4'
})

/*function to generate an URL, it creates a unique random image name.
Params specifies the bucket and image name and for how many seconds
the url is valid. */

// module.exports =  async function generateUpURL(){
//     const rawBytes = await randomBytes(16)
//     const picName = rawBytes.toString('hex')
//
//
//     const params = ({
//         Bucket : s3Name,
//         Key:picName,
//         Expires: 70
//     })
//
//     const uploadURL = await s3.getSignedUrlPromise('putObject', params)
//     return uploadURL
    
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