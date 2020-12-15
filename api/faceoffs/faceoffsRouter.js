const router = require('express').Router();
const { crudOperationsManager } = require('../../lib/');
const {
    authRequired
} = require('../middleware');
const Faceoffs = require('./faceoffsModel');


router.get('/', (request, response) => {
    crudOperationsManager.getAll(response, Faceoffs.getAll, 'Faceoffs')
});

router.get('/:id', (request, response) => {
    const { id } = request.params;
    crudOperationsManager.getById(response, Faceoffs.getById, 'Faceoffs', id);
});

router.post('/', (request, response) => {
    const newFaceoff = request.body;
    crudOperationsManager.post(response, Faceoffs.add, 'Faceoffs', newFaceoff);
});

router.put('/:id', (request, response) => {
    const { id } = request.params;
    const changes = request.body;
    
    crudOperationsManager.update(response, Faceoffs.update, 'Faceoffs', changes);
})


module.exports = router;