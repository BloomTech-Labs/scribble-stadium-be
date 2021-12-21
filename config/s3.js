import dotenv  from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import {promisify} from "util"

const randomBytes = promisify(crypto.randomBytes)
dotenv.config()

//s3 bucket setup
const region = "Us-east-1";
const s3Name= "scribble-stadium-assets-stage";
const accessKeyId = process.env.AWSAccessKeyId;
const secretAccessKey = process.env.AWSSecretKey;


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

/*function to generate an URL, it creates a unique random image name.
Params specifies the bucket and image name and for how many seconds
the url is valid. */

module.exports =  async function generateUpURL(){
    const rawBytes = await randomBytes(16)
    const picName = rawBytes.toString('hex')
    
    
    const params = ({
        Bucket : s3Name,
        Key:picName,
        Expires: 70
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
    
    
}
