const router = require('express').Router();
const { crudOperationsManager } = require('../../lib/');
const {
    authRequired
} = require('../middleware');
const Faceoffs = require('./faceoffsModel');


router.get('/', (request, response) => {
    crudOperationsManager.getAll(response, Faceoffs.getAll, 'Faceoffs')
});


module.exports = router;