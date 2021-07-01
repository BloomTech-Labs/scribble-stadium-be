const db = require('../../data/db-config');
const createNotification = async (notificationObject, bridgeTableArray) => {
  if (notificationObject['Text']) {
    const notificationID = await db('Notifications')
      .insert({
        Text: notificationObject[`Text`],
        Type: notificationObject[`Type`] || 'information',
        LinksTo: notificationObject[`LinksTo`] || '',
        Date: notificationObject[`Date`] || new Date(), //date needs formatting
        DueDate: notificationObject[`DueDate`] || null,
      })
      .returning('ID');
    if (notificationID[0]) {
      if (bridgeTableArray && bridgeTableArray.length > 0) {
        const userIDStrings = {
          Children: 'ChildID',
          Parents: 'ParentID',
          Staff: 'StaffID',
        };
        bridgeTableArray.forEach(async (userTable) => {
          const userIDs = await db(userTable).pluck('ID');
          const bridgeTableData = userIDs.map((id) => {
            if (id > 0) {
              return {
                [userIDStrings[userTable]]: parseInt(id),
                NotificationID: parseInt(notificationID[0]),
              };
            }
          });
          const populate = await db(`${userTable}-Notifications`).insert(
            bridgeTableData
          );
          if (populate) {
            return true;
          }
        });
      }
    } else {
      console.log('error: notificationID not found');
    }
  } else {
    console.log(
      `error: no notification Text property provided (notificationObject provided: ${JSON.parse(
        notificationObject
      )})`
    );
  }
  return false;
};
module.exports = createNotification;
