const cron = require('node-cron');
const CronTasks = require('./cronTasks');

// Reveal (Friday Afternoon)
cron.schedule('0 15 * * 5', () => {
    CronTasks.updateWinsForChildren();
    CronTasks.updateLosesForChildren();
}) 

// Reset (Saturday Morning)
cron.schedule('0 11 * * 6', async () => { 
    CronTasks.addTotalPointsToChildren();
    await CronTasks.resetTable('Points');
    await CronTasks.resetTable('Members');
    await CronTasks.resetTable('Teams');
    await CronTasks.resetTable('Faceoffs');
    await CronTasks.resetTable('Squads');
});