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

router.post('/read/:ID', authRequired, async (req, res) => {
  const { ID } = req.params;
  try {
    const count = await Submissions.markAsRead(ID);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'SubmissionNotFound' });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
