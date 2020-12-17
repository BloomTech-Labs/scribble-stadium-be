const cron = require('node-cron');
const CronTasks = require('./cronTasks');


// Reveal (Friday Afternoon)
cron.schedule('0 17 * * 5', () => {
    CronTasks.getWinningTeam();
    CronTasks.getLosingTeam();
}) 

// Reset (Saturday Morning)
cron.schedule('0 11 * * 6', () => {
    // Go into the CHildren's table and adding points to the Total_Points
    // How do we go through and update TOtal_Points
    // Make a query on the db, 
    CronTasks.addTotalPointsToChildren();
});