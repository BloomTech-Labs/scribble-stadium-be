const cron = require('node-cron');
const cronNotificationTasks = require('./cronNotificationTasks');
// Create notification for new story to read:

//day one - READ - (Saturday)
cron.schedule('0 9 * * 6', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "You have a new story to read!",
            "LinksTo": "/child/story",
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
            //error handling?
        }
        else {
            console.log('error in notificationScheduler.js -READ-');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
})

//day two - DRAW - (Monday)
cron.schedule('0 9 * * 1', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "Draw a picture based on the story you read!",
            "LinksTo": "/child/drawing-sub",
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
        }
        else {
            console.log('error in notificationScheduler, -DRAW-');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});

//day three - WRITE - (Tuesday)
cron.schedule('0 9 * * 2', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "Write a story based on the story you read",
            "LinksTo": "/child/writing-sub",
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
        }
        else {
            console.log('error in notificationScheduler, -WRITE-');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
})

//day four - notifications for staff - (Wednesday)
//~~code here~~

//day five - POINTSHARE/PAIRINGS - (Thursday)
cron.schedule('0 9 * * 4', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "See who you are paired with, use your points to give your team the best chance to win!",
            "LinksTo": "/child/point-share",
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
        }
        else {
            console.log('error in notificationScheduler, -POINTSHARE-');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
})

//day six - VOTE - (Friday)
cron.schedule('0 9 * * 5', async () => {
    try {
        const notificationID = await cronNotificationTasks.createNotification({
            "Text": "Vote for the best writing and drawing!",
            "LinksTo": "/child/match-up", /// possibly /child/match-up/squad-vote
        });
        if (notificationID[0]) {
            await cronNotificationTasks.populateBridgeTable('Children', notificationID[0]);
        }
        else {
            console.log('error in notificationScheduler, -VOTE-');
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
})
// get routes: https://github.com/Lambda-School-Labs/story-squad-fe/blob/main/src/index.js
//questions: error handling, how to test specific calls to mocked function from same file