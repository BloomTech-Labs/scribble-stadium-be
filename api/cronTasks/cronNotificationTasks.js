const db = require('../../data/db-config');
const knex = require('knex');
const createNotification = async (notificationObject) => {
  try {
    if (notificationObject["Text"]) {
      return await db('Notifications')
        .insert({
          "Text": notificationObject["Text"],
          "Type": notificationObject["Type"] || "information",
          "LinksTo": notificationObject["LinksTo"] || "",
          "Date": notificationObject["Date"] || new Date,
          "DueDate": notificationObject["DueDate"] || null
        }).returning('ID');
    }
    console.log('error in cronNotificationTasks.js line 15');
    return false;
  }
  catch (err) {
    throw err;
    console.log(err);
  }
};

const populateBridgeTable = async (userTable, notificationID) => {
  try {
    const userIDString = () => {
      if (userTable === "Children") { return "ChildID" }
      if (userTable === "Parents") { return "ParentID" }
      if (userTable === "Staff") { return "StaffID" }
    }
    const userIDs = await db(userTable).pluck("ID");
    const notificationExists = await db('Notifications').where({ ID: notificationID });
    if (userIDs && notificationExists) {
      const bridgeTableArray = userIDs.map(id => {
        if (id > 0) {
          return ({
            [userIDString()]: parseInt(id),
            "NotificationID": parseInt(notificationID)
          });
        }
      });
      const populate = await db(`${userTable}-Notifications`).insert(bridgeTableArray)
      if (populate) {
        return true;
      }
    }
    return false;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { createNotification, populateBridgeTable }
