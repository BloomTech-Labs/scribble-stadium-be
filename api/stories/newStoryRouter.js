const router = require('express').Router();
const db = require('./newStoryModel');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const story = await db.getStoryByID(id);
    res.json(story[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
