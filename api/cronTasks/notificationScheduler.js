const cron = require('node-cron');
const cronNotificationTasks = require('./cronNotificationTasks');
// Create notification for new story to read:

//dates/times not decided, should there be variable values stored so that changes are easier?

cron.schedule('0 9 * * 5', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "You have a new story to read!",
            "LinksTo": "[placeholder for link to current story]",
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
            //error handling?
        }
        else {
            console.log('error in notificationScheduler.js line 19');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
})