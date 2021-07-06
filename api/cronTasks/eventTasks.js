const createNotification = require('./createNotification.js');
const updateEventStatus = require('./updateEventStatus.js');
const eventTasks = {
  Read: {
    open: async (event) => {
      await createNotification(
        {
          Text: `%username%, you have a new story to read!`,
          LinksTo: '/child/story',
        },
        ['Children']
      );
      updateEventStatus(event, ['Children'], true);
    },
    close: async (event) => {
      updateEventStatus(event, ['Children'], false);
    },
  },
  Draw: {
    open: async (event) => {
      await createNotification(
        {
          Text: `%username%, draw a picture based on the story you read!`,
          LinksTo: '/child/drawing-sub',
        },
        ['Children']
      );
      updateEventStatus(event, ['Children'], true);
    },
    close: async (event) => {
      updateEventStatus(event, ['Children'], false);
    },
  },
  Write: {
    open: async (event) => {
      await createNotification(
        {
          Text: `%username%, write a story based on the story you read!`,
          LinksTo: '/child/writing-sub',
        },
        ['Children']
      );
      updateEventStatus(event, ['Children'], true);
    },
    close: async (event) => {
      updateEventStatus(event, ['Children'], false);
    },
  },
  StaffReview: {
    open: async (event) => {
      // await createNotification(
      //   {
      //     Text: `%username%, you have user submissions to review.`,
      //     LinksTo: '/child/drawing-sub',
      //   },
      //   ['Staff']
      // );
      // updateEventStatus(event, ['Staff'], true);
    },
    close: async (event) => {
      // updateEventStatus(event, ['Staff'], false);
    },
  },
  PointShare: {
    open: async (event) => {
      await createNotification(
        {
          Text: `%username%, see who you are paired with, use your points to give your team the best chance to win!`,
          LinksTo: '/child/point-share',
        },
        ['Children']
      );
      updateEventStatus(event, ['Children'], true);
    },
    close: async (event) => {
      updateEventStatus(event, ['Children'], false);
    },
  },
  Vote: {
    open: async (event) => {
      await createNotification(
        {
          Text: `%username%, vote for the best writing and drawing!`,
          LinksTo: '/child/match-up',
        },
        ['Children']
      );
      updateEventStatus(event, ['Children'], true);
    },
    close: async (event) => {
      updateEventStatus(event, ['Children'], false);
    },
  },
};
module.exports = eventTasks;
