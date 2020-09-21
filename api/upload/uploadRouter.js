const router = require('express').Router();
const multiparty = require('multiparty');
const fileType = require('file-type');
const fs = require('fs');

const { uploadFile } = require('../../lib/awsBucket');

router.post('/', async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    res.send({ files, fields });
    // try {
    //   const path = files.file[0].path;
    //   const buffer = fs.readFileSync(path);
    //   const type = await fileType.fromBuffer(buffer);
    //   const timestamp = Date.now().toString();
    //   const fileName = `bucketFolder/${timestamp}-lg`;

    //   // Call our S3 upload function
    //   const data = await uploadFile(buffer, fileName, type);
    //   console.log(data);
    //   return res.status(200).send(data);
    // } catch (error) {
    //   return res.status(400).json(error);
    // }
  });
});

module.exports = router;
