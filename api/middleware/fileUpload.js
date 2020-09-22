// multiparty does the heavy lifting for up parsing form data from the request
const multiparty = require('multiparty');
// file-type reads the file type from any files uploaded into the form
const fileType = require('file-type');
// fs reads the file data out of the body into a "buffer" stream
const fs = require('fs');

const { uploadFile } = require('../../lib/awsBucket');

const fileUploadHandler = async (req, res, next) => {
  // Create a new instance of a multiparty form object
  const form = new multiparty.Form();
  // Parse the form data from the request body into multiparty
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);

    try {
      const fileNames = Object.keys(files);

      const resolvedFiles = {};

      console.log('BEGIN THINGY');

      for await (const f of fileNames) {
        const paths = files[f].map((x) => x.path);
        const buffers = paths.map((path) => fs.readFileSync(path));
        const typePromises = buffers.map((buffer) =>
          fileType.fromBuffer(buffer)
        );
        const types = await Promise.all(typePromises);
        const uploadFileNames = paths.map((path) => {
          const timestamp = Date.now().toString();
          return `bucketFolder/${timestamp}-lg-${path}`;
        });

        const promiseList = files[f].map((_, i) => {
          return uploadFile(buffers[i], uploadFileNames[i], types[i]);
        });

        const resolved = await Promise.all(promiseList);
        // console.log({ resolved });
        resolvedFiles[f] = resolved;
        console.log('=== RESOLVED ===');
      }

      console.log({ resolvedFiles });

      const formInputs = {};
      Object.keys(fields).forEach((x) => {
        formInputs[x] = fields[x][0];
      });

      const data = {
        ...formInputs,
        ...resolvedFiles,
      };
      req.body = {
        ...req.body,
        ...data,
      };
      next();
    } catch (err) {
      console.log('OH NO');
      res.status(500).json({ err });
    }
  });
};

module.exports = {
  fileUploadHandler,
};
