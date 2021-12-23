const router = require('express').Router();

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, fetchFileStream } = require('../../config/s3');

//These End points were to test S3 functionality.
//Will need to submit the actual uploads as part of the submission/pages records.
//gets images from the s3 bucket based on the key that it was stored under.
router.get('/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = fetchFileStream(key)

    readStream.pipe(res)
})
// send the file to the
router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)

    // we can modify the files if need be here.
    // This can be implemented in the correct endpoint as needed.
    const result = await uploadFile(file)

    // unlinkFile deletes the images stored on the BE server once they're uploaded to the S3 bucket.
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath: `/images/${result.Key}`})
});

module.exports = router;
