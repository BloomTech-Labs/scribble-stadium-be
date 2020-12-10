const cron = require('node-cron');
const CronJob = require('./cronModel');

// RWD (Saturday-Monday)
cron.schedule('* * * * 6,0,1', () => {
    console.log("It is working!!!", "Saturday-Monday");
})

// Moderation (Tuesday)
cron.schedule('* * * * 2', () => {
    console.log("It is working!!!", "Tuesday");
})

// Points Share (Wednesday)
cron.schedule('* * * * 3', () => {
    console.log("It is working!!!", "Wednesday");
})

// Independent Voting (Thursday - Friday Evening)
cron.schedule('* * * * 4-5', () => {
    console.log("It is working!!!", "Thursday-Friday Evening");
})

// Reveal (Friday Night)
cron.schedule('* * * * 5', () => {
    console.log("It is working!!!", "Friday Reveal");
})

// Reset (Saturday Morning)
cron.schedule('* * * * 6', () => {
    console.log("It is working!!!");
})
