const db = require('../../data/db-config.js');
const updateEventStatus = (event, bridgeTableArray, enabled = true) => {
  bridgeTableArray.forEach(async (userTable) => {
    const userIDs = await db(userTable).pluck('ID');
    const userIDStrings = {
      Children: 'ChildID',
      Parents: 'ParentID',
      Staff: 'StaffID',
    };
    const userID = userIDStrings[userTable];
    const bridgeTableData = userIDs.map((id) => {
      return ([parseInt(id), parseInt(event.ID), enabled, false]);
    });
    if (bridgeTableData && bridgeTableData.length > 0) {
      const tableName = `${userTable}-Events`;
      const values = `(${bridgeTableData.join("), (")})`;
      const populate = await db.raw(
        `INSERT INTO "${tableName}"
        ("${userID}", "EventID", "Enabled", "Completed") 
        VALUES ${values}
        ON CONFLICT ON CONSTRAINT "${userID}-EventID"
        DO UPDATE SET "Enabled"=EXCLUDED."Enabled", "Completed"=EXCLUDED."Completed";`
      );
      if (populate) return true;
    }
  });
  return false;
};
module.exports = updateEventStatus;
