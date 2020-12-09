const router = require('express').Router();
const Reset = require('./resetModel');
const { ops } = require('../../lib');


// Still working on it
router.put('/reset', (req, res) => {
    ops.update(res, Reset.resetGameForTesting, 'Reset');
})

module.exports = router;