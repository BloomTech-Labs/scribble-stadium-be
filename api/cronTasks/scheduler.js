const cron = require('node-cron');
const CronTasks = require('./cronTasks');
const cronNotificationTasks = require('./cronNotificationTasks');

// Reveal (Friday Afternoon)
cron.schedule('0 15 * * 5', () => {
  CronTasks.updateWinsForChildren();
  CronTasks.updateLosesForChildren();
});

// Reset (Saturday Morning)
cron.schedule('0 11 * * 6', async () => {
  CronTasks.addTotalPointsToChildren();
  await CronTasks.resetTable('Points');
  await CronTasks.resetTable('Members');
  await CronTasks.resetTable('Teams');
  await CronTasks.resetTable('Faceoffs');
  await CronTasks.resetTable('Squads');
});

// Create notification for new story to read:

//dates/times not decided, should there be variable values stored so that changes are easier?

cron.schedule('0 9 ** 5', async () => {
  const notificationID = await cronNotificationTasks.createNotification({
    "Text": "You have a new story to read!",
    "LinksTo": "[placeholder for link to current story]",
    "DueDate": "[placeholder for due date]"
  });
  if (notificationID[0]) {
    await cronNotificationTasks.populateBridgeTable('Children', notificationID);
    //error handling?
  }
})