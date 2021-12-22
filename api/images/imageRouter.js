const router = require('express').Router();

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, fetchFileStream } = require('../../config/s3')


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

    const result = await uploadFile(file)

    // unlinkFile deletes the images stored on the BE server once they're uploaded to the S3 bucket.
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath: `/images/${result.Key}`})
});

module.exports = router;