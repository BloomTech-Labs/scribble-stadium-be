# Cron Tasks

## Scheduler

    -From time based functions calls, I used a npm package called node-cron (https://www.npmjs.com/package/node-cron)

    -To schedule a time used the schedule method like below:

    ```javascript
    cron.schedule('0 15 * * 5', () => {
        CronTasks.updateWinsForChildren();
        CronTasks.updateLosesForChildren();
    }) 
    ```

    -There are 2 parameters, a string that contains time and a callback function which takes what needs to be executed at the specific time

    -In the code above, the string translates to 3:00 PM on Friday
    
    -The first value is minutes

    -The second value is hours

    -The third value is day of the month
    
    -The fourth value is month

    -The fifth value is day of the week

    -You can either put a numerical value or use an asterisk (*), which simply means every value available
        -By putting an asterisk on the third value, I am saying that I want every day of the month to be used

## Heroku CLI

    -To interact with the database on Heroku, you need to understand how to set up and use the heroku cli
    -For more information go to (https://devcenter.heroku.com/articles/heroku-cli)
    
    Steps to Set up Heroku CLI

    1) Install heroku using npm (npm install -g heroku)

    2) Login to heroku using your Lambda credentials (heroku login)

    3) In the terminal, to run a heroku command simply use (heroku run -a <story-squad-b-api> <insert command>)
