const router = require('express').Router();
const db = require('./newStoryModel')

/* const {
  authRequired,
  storyValidation,
  storyUpdateValidation,
} = require('../middleware');
const { crudOperationsManager } = require('../../lib'); */

router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const story = await db.getStoryByID(id);
        res.json(story)
    }catch(err){
        console.log(err)
    }
});

module.exports = router;
