const express = require('express');
const authRequired = require('../middleware/authRequired');
const Parents = require('./parentModel');
const router = express.Router();

/**
 *
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const parents = await Parents.findAll();
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 *
 */
router.get('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parents.findById(id);
    if (parent.length > 0) {
      res.status(200).json(parent);
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 *
 */
router.post('/', authRequired, async (req, res) => {
  const parent = req.body;
  try {
    const data = await Parents.add(parent);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 *
 */
router.put('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await Parents.update(id, changes);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 *
 */
router.delete('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Parents.remove(id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ParentNotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
