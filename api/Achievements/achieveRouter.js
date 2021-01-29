const router = require('express').Router();

const{authRequired,
    achievementValidation,
    achieveUpdateValidation,
} = require('../middleware');

const {crudOperationsManager} = require('../../lib/');
const achievements = require('./achieveModel')

//put auth require back in
router.get('/', authRequired (req, res) =>{
    crudOperationsManager.getAll(res, achievements.getAll, 'Achievements');
});


router.get('/:id', authRequired, (req, res) => {
    // Pull achievement ID out of the URL params
    const { id } = req.params;
  
    crudOperationsManager.getById(res, achievements.getById, 'Achievements', id);
  });

  router.post('/', authRequired, achievementValidation, (req, res) => {
    // Pull relevant data out of the request object
    const newAchievements = req.body;
  
    crudOperationsManager.post(res, achievements.add, 'Achievements', newAchievements);
  });


  router.put('/:id', authRequired, achieveUpdateValidation, (req, res) => {
    // Pull relevant data out of the request object
    const { id } = req.params;
    const changes = req.body;
  
    crudOperationsManager.update(res, achievements.update, 'Achievements', id, changes);
  });

  router.delete('/:id', authRequired, (req, res) => {
    // Pull achievement ID out of the URL params
    const { id } = req.params;
  
    crudOperationsManager.update(res, achievements.remove, 'Achievements', id);
  });

  module.exports = router;