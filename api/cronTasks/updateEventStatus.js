const db = require('../../data/db-config.js');
const updateEventStatus = (event, bridgeTableArray, enabled = true) => {
  bridgeTableArray.forEach(async (userTable) => {
    const userIDs = await db(userTable).pluck('ID');
    const bridgeTableData = userIDs.map((id) => {
      const userIDStrings = {
        Children: 'ChildID',
        Parents: 'ParentID',
        Staff: 'StaffID',
      };
      return {
        [userIDStrings[userTable]]: parseInt(id),
        EventID: parseInt(event.ID),
        Enabled: enabled,
        Completed: false,
      };
    });
    if (bridgeTableData) {
      const populate = await db(`${userTable}-Events`).insert(bridgeTableData);
      if (populate) {
        return true;
      }
    }
  });
  return false;
};
module.exports = updateEventStatus;
