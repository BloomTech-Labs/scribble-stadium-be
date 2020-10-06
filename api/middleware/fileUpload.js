/* istanbul ignore file */
// multiparty does the heavy lifting for up parsing form data from the request
const multiparty = require('multiparty');
// file-type reads the file type from any files uploaded into the form
const fileType = require('file-type');
// fs reads the file data out of the body into a "buffer" stream
const fs = require('fs');

const { uploadFile, generateChecksum } = require('../../lib/uploadHelpers');

/**
 * This middleware is here to handle file upload to our S3 bucket. It reads form data
 * from the body of the reques, parses it into readable file data, stores that data in
 * the S3 bucket defined in your ENV variables, and then adds the uploaded file data
 * as well as any other form data into the body of your request. Each line is commented
 * to provide a better overview of what is happening line-by-line, as well as the role
 * that each external library is playing in the process.
 * @param {Object} req the server request object
 * @param {Object} req.body should be a JavaScript FormData() instance
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const fileUploadHandler = async (req, res, next) => {
  // Create a new instance of a multiparty form object
  const form = new multiparty.Form();
  // Parse the form data from the request body into multiparty
  form.parse(req, async (error, fields, files) => {
    // Iterate over the request body and parse all form data
    try {
      // Get a list of all form fields that had file uploads
      const fileNames = Object.keys(files);

      // Initiate a hash table to store resolved file upload values
      const resolvedFiles = {};
      const checksums = {};

      // Check each field, and upload however many files were in each input
      for await (const f of fileNames) {
        // Get the path of each file
        const paths = files[f].map((x) => x.path);

        // Read each file into a buffer
        const buffers = paths.map((path) => fs.readFileSync(path));

        buffers.forEach((s) => {
          if (!checksums[f]) {
            checksums[f] = [];
          }
          checksums[f].push(generateChecksum(s));
        });

        // Create a list of promises to find each file type and resolve them
        const typePromises = buffers.map((buffer) =>
          fileType.fromBuffer(buffer)
        );
        const types = await Promise.all(typePromises);

        // Generate unique names for each file
        const uploadFileNames = paths.map((path, i) => {
          const timestamp = Date.now().toString();
          return `bucketFolder/${timestamp}-lg-${path}-${i + 1}`;
        });

        // Create a list of promises that upload files to the S3 bucket
        const promiseList = files[f].map((_, i) => {
          return uploadFile(buffers[i], uploadFileNames[i], types[i]);
        });

        // Resolve those promises and store them in the hash table with key being the form input value
        const resolved = await Promise.all(promiseList);
        resolvedFiles[f] = resolved.map((x, i) => ({
          ...x,
          Checksum: checksums[f][i],
        }));
      }

      // Pull the non-file form inputs into a hash table
      const formInputs = {};
      Object.keys(fields).forEach((x) => {
        formInputs[x] = fields[x][0];
      });

      // Add the resolved file objects and the standard inputs into the request body
      req.body = {
        ...req.body,
        ...formInputs,
        ...resolvedFiles,
      };

      // Continue to router
      next();
    } catch (err) {
      // There was an error with the S3 upload
      res.status(409).json({ error: 'File upload failed.' });
    }
  });
};

module.exports = fileUploadHandler;
