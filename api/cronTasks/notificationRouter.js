
const router = require('express').Router();
// const CronTasks = require('./cronTasks');  //notifications
const Children = require('../child/childModel');  




router.get('/', async (req, res, next) => {    //child/:id/dashboard/
// Regular update    message: `Welcome ${user.username}, You have ${days} to complete your ${assignment}  


      try{
        const getChildName = await Children.getById(req.params.id);
        // const getChildName = await Children.getById(req.params.id);

        return res.status(200).json(getChildName);
    } catch(error){
        next(error)
    }
}) 



module.exports = router;
