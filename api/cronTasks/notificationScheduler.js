const cron = require('node-cron');
const eventTasks = require('./eventTasks.js');
const db = require('../../data/db-config.js');

db('Events').then(events=>{
  events.forEach((event) => {
    if (event.Open) {
      if (cron.validate(event.Open)) {
        cron.schedule(`'${event.Open}'`, async () => {
          if (typeof eventTasks[event.Name].open === 'function') {
            eventTasks[event.Name].open(event);
          }
        });
      } else {
        console.log(`invalid node-cron string provided for event: ${event.Name}`);
      }
    }
    if (event.Close) {
      if (cron.validate(event.Close)) {
        cron.schedule(event.Close, async () => {
          if (typeof eventTasks[event.Name].close === 'function') {
            eventTasks[event.Name].close(event);
          }
        });
      } else {
        console.log(`invalid node-cron string provided for event: ${event.Name}`);
      }
    }
  });

});
