const multiparty = require('multiparty');
const fileType = require('file-type');
const fs = require('fs');

const { uploadFile } = require('../../lib/awsBucket');

const fileUploadHandler = (req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    if (files.length === 0) res.status(400).json({ error: 'NoFileGiven' });

    // Pull all standard form fields into
    const formInputs = {};
    Object.keys(fields).forEach((x) => {
      formInputs[x] = fields[x][0];
    });

    try {
      const fileNames = Object.keys(files);
      const fileList = fileNames.map(async (f) => {
        const path = files[f][0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        return uploadFile(buffer, fileName, type);
      });

      const fileURLs = await Promise.all(fileList);

      const fileObjects = {};
      fileURLs.forEach((url, idx) => {
        fileObjects[fileNames[idx]] = url;
      });

      // console.log(fileObjects);
      req.body = {
        ...req.body,
        ...formInputs,
        ...fileObjects,
      };

      // Continue if all things pass
      next();
    } catch (error) {
      res.status(500).json({ error: 'FileUploadFailed' });
    }

    // try {
    //   const path = files.avatar[0].path;
    //   const buffer = fs.readFileSync(path);
    //   const type = await fileType.fromBuffer(buffer);
    //   const timestamp = Date.now().toString();
    //   const fileName = `bucketFolder/${timestamp}-lg`;

    //   // Call our S3 upload function
    //   const { Location } = await uploadFile(buffer, fileName, type);

    //   return res.status(200).send(Location);
    // } catch (error) {
    //   return res.status(400).json(error);
    // }
  });
};

module.exports = {
  fileUploadHandler,
};
