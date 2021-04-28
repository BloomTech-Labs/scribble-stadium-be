const router = require('express').Router();

const {crudOperationsManager} = require('../../lib');

const Gallery = require('./GalleryModel');

router.get('/', (req, res) => {
    crudOperationsManager.getAll(res, Gallery.getAll, "Gallery");
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    crudOperationsManager.getById(res, Gallery.getById, "Gallery", id);
});

router.post('/', (req, res) => {
    const submission = req.body;

    crudOperationsManager.post(res, Gallery.add, "Gallery", submission);
});

module.exports = router;