const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const Children = require('./childModel');

router.get('/', authRequired, async (req, res) => {
  try {
    const children = await Children.findAll();
    res.status(200).json(children);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const child = await Children.findById(id);
    if (child.length > 0) {
      res.status(200).json(child[0]);
    } else {
      res.status(404).json({ error: 'ChildNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authRequired, async (req, res) => {
  const child = req.body;
  try {
    const data = await Children.add(child);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
