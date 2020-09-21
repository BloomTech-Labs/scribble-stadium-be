const router = require('express').Router();

const { fileUploadHandler } = require('../middleware/fileUpload');

router.post('/', fileUploadHandler, async (req, res) => {
  const { files } = req;

  res.status(200).json({ files });
});

module.exports = router;
