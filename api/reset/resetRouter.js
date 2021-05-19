const router = require('express').Router();
const Reset = require('./resetModel');
const { crudOperationsManager } = require('../../lib');

// Still working on it
router.put('/reset', (req, res) => {
  crudOperationsManager.update(res, Reset.resetGameForTesting, 'Reset');
});

module.exports = router;
