const cron = require('node-cron');
const eventTasks = require('./eventTasks.js');
const db = require('../../data/db-config.js');
const sortAndFilterCronTasks = require('../../lib/sortAndFilterCronTasks.js');

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  //this simulates the sequential running of the subset of events between firstEventCronString and mockedCurrentCronString - for development purposes only.
  db('Events').then((events) => {
    const firstEventCronString = "0 9 * * Saturday";
    const mockedCurrentCronString = "0 9 * * Wednesday";
    const sortedCronTasks = sortAndFilterCronTasks(events,firstEventCronString,mockedCurrentCronString);
    sortedCronTasks.forEach((task) => {
      const fullTaskName = Object.keys(task)[0];
      const taskName = fullTaskName.slice(0,fullTaskName.indexOf("-"));
      const taskType = fullTaskName.slice(fullTaskName.indexOf("-")+1).toLocaleLowerCase();
      if (typeof eventTasks[taskName][taskType] === 'function') {
        const dbEventIndex = events.findIndex((event) => {
          if (event.Name === taskName) return true;
        });
        eventTasks[taskName][taskType](events[dbEventIndex]);
      }
    })
  });
} else {
  db('Events').then((events) => {
    events.forEach((event) => {
      if (event.Open) {
        if (cron.validate(event.Open)) {
          cron.schedule(`'${event.Open}'`, async () => {
            if (typeof eventTasks[event.Name].open === 'function') {
              eventTasks[event.Name].open(event);
            }
          });
        } else {
          console.log(
            `invalid node-cron string provided for event: ${event.Name}`
          );
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
          console.log(
            `invalid node-cron string provided for event: ${event.Name}`
          );
        }
      }
    });
  })
};
