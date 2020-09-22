// multiparty does the heavy lifting for up parsing form data from the request
const multiparty = require('multiparty');
// file-type reads the file type from any files uploaded into the form
const fileType = require('file-type');
// fs reads the file data out of the body into a "buffer" stream
const fs = require('fs');

const { uploadFile } = require('../../lib/awsBucket');

const fileUploadHandler = (req, res, next) => {
  // Create a new instance of a multiparty form object
  const form = new multiparty.Form();
  // Parse the form data from the request body into multiparty
  form.parse(req, async (error, fields, files) => {
    // Check for basic error cases
    if (error) throw new Error(error);
    if (files.length === 0) throw new Error('NoFileGiven');

    // Iterate over the request body and parse all form data
    try {
      // Get a list of all uploaded files
      const fileNames = Object.keys(files);
      // Iterate over the filenames, and parse them into an array of promises
      const fileList = fileNames.map(async (f) => {
        // Get the path out of each file from the multiparty files object
        const path = files[f][0].path;
        // Read all of those file paths into a buffer
        const buffer = fs.readFileSync(path);
        // Get the type out of the buffer (async)
        const type = await fileType.fromBuffer(buffer);
        // Create a timestamp to be used in naming the file for storage
        const timestamp = Date.now().toString();
        // Create a name to store the file under
        const fileName = `bucketFolder/${timestamp}-lg`;
        // Return a promise that uploads each given file into an s3 bucket and
        // resolves to an object containing the data for the new upload
        return uploadFile(buffer, fileName, type);
      });

      // Use Promise.all() to execute ALL promises that were stored in the fileList
      const fileURLs = await Promise.all(fileList);
      // Create a hash table to store the file upload data into
      const fileObjects = {};
      // Iterate over all of the uploaded file objects
      fileURLs.forEach((data, idx) => {
        // Store them in the hash table with the key being the form field name
        fileObjects[fileNames[idx]] = data;
      });

      // Read ALL standard form fields into their own object
      const formInputs = {};
      Object.keys(fields).forEach((x) => {
        formInputs[x] = fields[x][0];
      });

      // Spread all of the file objects and standard field objects into the
      // req.body to mirror the expected behavior of a standard form upload
      req.body = {
        ...req.body,
        ...formInputs,
        ...fileObjects,
      };

      // If everything up to this point was successful, continue to the router
      next();
    } catch (error) {
      // There was an error somewhere along the way with the file upload
      res.status(500).json({ error: 'FileUploadFailed' });
    }
  });
};

module.exports = {
  fileUploadHandler,
};
