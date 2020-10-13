const router = require('express').Router();

const { authRequired } = require('../middleware');

router.get('/', authRequired, (req, res) => {
  res.send(1);
});

module.exports = router;
