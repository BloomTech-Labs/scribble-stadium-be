const router = require('express').Router();
const Submissions = require('./submissionModel');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, async (req, res) => {
  const { childId, storyId } = req.params;
  const sub = await Submissions.getOrInitSubmission(childId, storyId);
});

// router.post('/read', authRequired, async (req, res) => {
//   const { SubmissionID } = req.body;
//   await Submissions.markAsRead()
// });

module.exports = router;
