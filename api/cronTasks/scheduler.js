const cron = require('node-cron');
const CronTasks = require('./cronTasks');


// Reset (Saturday Morning)
cron.schedule('0 17 * * 6', () => {
    // Go into the CHildren's table and adding points to the Total_Points
    // How do we go through and update TOtal_Points
    // Make a query on the db, 
    CronTasks.addTotalPointsToChildren()
});