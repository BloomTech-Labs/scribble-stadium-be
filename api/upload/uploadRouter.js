const router = require('express').Router();

const { fileUploadHandler } = require('../middleware/fileUpload');

router.post('/', fileUploadHandler, async (req, res) => {
  res.status(200).json(req.body);
});

module.exports = router;
