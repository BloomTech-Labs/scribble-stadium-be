
const router = require('express').Router();


const CronTasks = require('./cronTasks');  //notifications
const childInfo = require('../child/childModel'); // getComplexityList    getById(child)   getDay()dateValidation/Router

// authRequired = require('../middleware/authRequired')
const {authRequired, childValidation, childUpdateValidation,} = require('../child/middleware');
// const {parentValidation, parentUpdateValidation,};  // const restrict = require("../users/userValidation");  does not exist

const currentDayOfTheWeek = require('../middleware/dateValidation')  // readWriteDrawDateValidation, pointsShareDateValidation, independentVotingDateValidation
// ..middleware/submissionsValidation



// Regular update    message: `Welcome ${user.username}, You have ${days} to complete your ${assignment} 
router.get('/:id', async (req, res, next) => {    //child/:id/dashboard/:id
    try{
        const getClass = await childInfo.getClasses(req.params.id);
        if(!getClass){
            return res.status(400).json({
                message: "Invalid ID"
            })
        }

        return res.status(200).json(getClass);
    } catch(error){
        next(error)
    }
}) 


//  If incomplete, reads different message. has different color
//     message: `Welcome ${user.username}, You have not completed your ${assignment} assignment. You have ${days} to complete this to unlock the next adventure! See you there!`,
// });
router.get('/:id', async (req, res, next) => {    //child/:id/dashboard/:id
  try{
      const getClass = await childInfo.getClasses(req.params.id);
      if(!getClass){
          return res.status(400).json({
              message: "Invalid ID"
          })
      }

      return res.status(200).json(getClass);
  } catch(error){
      next(error)
  }
})



// // Step Enabled Notification    (post submission)
// router.get('/squad', (req, res) =>{
// try{
//   crudOperationsManager.getAll(res, leaderboard.getTotalPointsToChildren, 'Child'),
//     res.status(200).json({message: `Congratulations ${user.username}! You have unlocked ${`assignmentsAdded`} acitivity and have ${days} to complete it`,
// });
// } catch (err) {
//   console.log(err)
//   next(err);
// }
// })


//  const childValidation = (...r) => {
//   checkInit(...r, fields, 'Child');
// };





module.exports = router;
