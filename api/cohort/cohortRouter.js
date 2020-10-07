const router = require('express').Router();
const { ops } = require('../../lib');
const Cohorts = require('./cohortModel');

router.post('/', (req, res) => {
  const newCohort = req.body;

  ops.postMult(res, Cohorts.add, 'Cohort', newCohort);
});

module.exports = router;
