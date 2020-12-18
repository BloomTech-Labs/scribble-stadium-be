const cron = require('node-cron');
const CronTasks = require('./cronTasks');

// Reveal (Friday Afternoon)
cron.schedule('0 17 * * 5', () => {
    CronTasks.updateWinsForChildren();
    CronTasks.updateLosesForChildren();
}) 

// Reset (Saturday Morning)
cron.schedule('0 11 * * 6', () => { 
    CronTasks.addTotalPointsToChildren();
});