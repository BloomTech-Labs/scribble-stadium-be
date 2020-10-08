const router = require('express').Router();

const { ops } = require('../../lib');

const Mod = require('./modModel');

// Cohort Endpoints

router.get('/cohorts', (req, res) => {
  ops.getAll(res, Mod.getCohorts, 'Cohort');
});

router.post('/cohorts', (req, res) => {
  const newCohort = req.body;

  ops.postMult(res, Mod.addCohort, 'Cohort', newCohort);
});

// Submission Endpoints

router.get('/submissions', (req, res) => {
  const cohortId = req.query.cohortId;

  ops.getAll(res, Mod.getSubmissionsByCohort, 'Cohort', cohortId);
});

router.put('/submissions/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  console.log(id, changes, 'THING');

  ops.update(res, Mod.moderatePost, 'Submission', id, changes);
});

module.exports = router;
