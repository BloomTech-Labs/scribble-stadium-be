/*Handle routes and HTTP request methods within an Express project. 
Routes handle user navigation to various URLs throughout your application. 
HTTP communicates and facilitates data from your Express server to the web browser. HTTP request methods GET, POST, PUT, and DELETE to ... data.*/
const router = require('express').Router();
const CronTasks = require('./cronTasks');



// Step Enabled Notification    (post submission)
router.get('/squad', (req, res) =>{
try{
  crudOperationsManager.getAll(res, leaderboard.getTotalPointsToChildren, 'Child'),
    res.status(200).json({message: `Congratulations ${user.username}! You have unlocked ${`assignmentsAdded`} acitivity and have ${days} to complete it`,
});
} catch (err) {
  console.log(err)
  next(err);
}
})

// Login Notification -Next Task  (read, write, draw, pointshare, vote)
router.post("/login", async (req, res, next) => {
try {
  // res.status(200).json(notifications);
  res.json({
    message: `Welcome ${user.username}, You have ${days} to complete your ${assignment} activity. Good Luck!`,
  });
} catch (err) {
  console.log(err)
  next(err);
}
})


// Login Notification -Not Completed
router.post("/login", async (req, res, next) => {
try {
  res.status(200).json({message: `Welcome ${user.username}, You have not completed your ${assignment} assignment. You have ${days} to complete this to unlock the next adventure! See you there!`,
});
} catch (err) {
  console.log(err)
  next(err);
}
})


/* 
1  the response body should have `notification/message` and `token`:
  {
    "message": "Welcome, <Username>, You have <# of days> to complete your <assignment>",
    "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      
  }
*/  




module.exports = router;
