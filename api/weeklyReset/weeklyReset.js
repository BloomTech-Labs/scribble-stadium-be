const cron = require('node-cron');
const db = require('../../data/db-config');

// Monday - Wednesday
cron.schedule('* * * * * 1-3', () => {
    console.log("It is working!!!")
})

// Thursday
cron.schedule('* * * * * 4', () => {
    console.log("It is working!!!")
})

// Friday
cron.schedule('* * * * * 5', () => {
    console.log("It is working!!!")
})