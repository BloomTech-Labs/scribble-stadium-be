const router = require('express').Router();
const Submissions = require('./submissionModel');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, async (req, res) => {
  try {
    const { childId, storyId } = req.query;
    const sub = await Submissions.getOrInitSubmission(childId, storyId);
    res.status(200).json(sub);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// router.post('/read', authRequired, async (req, res) => {
//   const { SubmissionID } = req.body;
//   await Submissions.markAsRead()
// });

module.exports = router;
