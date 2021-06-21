const cron = require('node-cron');
const cronNotificationTasks = require('./cronNotificationTasks');
// Create notification for new story to read:

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

cron.schedule('0 9 * * 1', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "Draw a picture based on the story you read!",
            "LinksTo": "[placeholder for draw link]",
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
        }
        else {
            console.log('error in notificationScheduler, line 35');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
})

//questions: error handling, how to test specific calls to mocked function from same file