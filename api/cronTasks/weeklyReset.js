const cron = require('node-cron');
const cronJob = require('./cronModel');

// RWD (Saturday-Monday)
cron.schedule('* * * * * 6,0,1', () => {
    console.log("It is working!!!");
})

// Moderation (Tuesday)
cron.schedule('* * * * * 2', () => {
    console.log("It is working!!!");
})

// Points Share (Wednesday)
cron.schedule('* * * * * 3', () => {
    console.log("It is working!!!");
})

// Independent Voting (Thursday - Friday Evening)
cron.schedule('* * * * * 4-5', () => {
    console.log("It is working!!!");
})

// Reveal (Friday Night)
cron.schedule('* * * * * 5', () => {
    console.log("It is working!!!");
})

// Reset (Saturday Morning)
cron.schedule('* * * * * 6', () => {
    console.log("It is working!!!");
})