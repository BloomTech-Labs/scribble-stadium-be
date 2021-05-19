const router = require('express').Router();

const {authRequired} = require('../middleware');
const SquadPoints = require('./SquadPointsModel');
const { crudOperationsManager } = require('../../lib/');

router.get('/', authRequired, (req, res) =>{
    crudOperationsManager.getAll(res, SquadPoints.getSquadPoints, 'Child')
});

module.exports = router;