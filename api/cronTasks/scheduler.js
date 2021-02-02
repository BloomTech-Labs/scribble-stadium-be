const cron = require('node-cron');
const CronTasks = require('./cronTasks');

// Reveal (Friday Afternoon)
cron.schedule('0 15 * * 5', () => {
    CronTasks.updateWinsForChildren();
    CronTasks.updateLosesForChildren();
}) 

// Reset (Saturday Morning)
cron.schedule('0 11 * * 6', () => { 
    CronTasks.addTotalPointsToChildren();
    CronTasks.resetTable('Teams')
    CronTasks.resetTable('Points')
    CronTasks.resetTable('Squads')
    CronTasks.resetTable('FaceOffs')
});