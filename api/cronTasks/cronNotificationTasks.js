const db = require('../../data/db-config');
const knex = require('knex');
const createNotification = async (notificationObject) => {
    if (notificationObject.text) {
        return await db('Notifications')
            .insert({
                "Text": notificationObject.text,
                "Type": notificationObject.type || "information",
                "LinksTo": notificationObject.linksTo || "",
                "Date": notificationObject.date || knex.fn.now(),
                "DueDate": notificationObject.dueDate || null
            }).returning('ID');
    }
    return false;
};

const populateBridgeTable = async (userTable, notificationID) => {
    const userIDString = () => {
        if (userTable === "Children") { return "ChildID" }
        if (userTable === "Parents") { return "ParentID" }
        if (userTable === "Staff") { return "StaffID" }
    }
    const userIDs = await db(userTable);
    const notificationExists = await db('Notifications').where({ ID: notificationID });
    if (userIDs && notificationExists) {
        const bridgeTableObject = {
            ...userIDs.map(id => {
            return ({[userIDString()]: id, "NotificationID": notificationID})
        })}
        const populate = await db(`${userTable}-Notifications`).insert(bridgeTableObject)
        if (populate) {
            return true;
        }
    }
    return false;
}

module.exports = { createNotification, populateBridgeTable }
