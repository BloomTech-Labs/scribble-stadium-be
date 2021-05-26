const router = require('express').Router();

const { authRequired, childUpdateValidation } = require('../middleware');
const { crudOperationsManager } = require('../../lib/');

const Streaks = require('./streaksModel');

router.get('/', authRequired, (req, res) => {
  crudOperationsManager.getAll(res, Streaks.getAll, 'Child');
});

router.get('/:id', authRequired, (req, res) => {
  const { id } = req.params;

  crudOperationsManager.getById(res, Streaks.getById, 'Child', id);
});

router.put('/:id', authRequired, childUpdateValidation, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  crudOperationsManager.update(res, Streaks.update, 'Child', id, changes);
});

module.exports = router;
