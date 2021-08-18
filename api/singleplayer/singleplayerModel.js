const db = require('../../data/db-config');

/**
 * Schema for Achievements data types.
 * @swagger
 * components:
 * schemas:
 *    Achievements:
 *      type: object
 *      properties:
 *        Name:
 *          type: string
 *        Description:
 *          types: string
 *       example:
 *         Name: achievement 1
 *         Description: This is the first achievement
 *    GetAchievements:
 *      allOf:
 *        - type: object
 *          required:
 *            - ID
 *          properties:
 *            ID:
 *              type: integer
 *              readOnly: true
 *              description: Auto-incrementing primary key
 *            Name:
 *              type: string
 *              description: acheivement name
 *            Description:
 *              type: string
 *              description: description of achievement
 *          example:
 *            ID: '1'
 *            Name: 'hAchievement 1'
 *            Description: 'This is the description'
 *        - $ref: '#/components/schemas/PostAchievements'
 */
// const getAll = () => {
//   return db('Achievements AS A').select(['A.ID', 'A.Name', 'A.Description']);
// };

/**
 * Search the database for an achievement with the given ID
 * @param {number} ID the unique ID to search the database on
 * @returns {Promise} promise that resolves to array of achievement with matching ID, empty if none found
 */
// const getById = (ID) => {
//   return db('Achievements AS A')
//     .where('A.ID', ID)
//     .select(['A.ID', 'A.Name', 'A.Description']);
// };

/**
 * Adds a achievement to the database
 * @param {Object} achievement contains the achievement's info
 * @param {string} achievement.Name name stored in a string
 * @returns {Promise} promise that resolves to ID of new achievement or an error message
 */
const add = (botdata) => {
    return db('Singleplayer')
        .insert({
            ...botdata,
        })
        .returning('ID');
};

/**
 * Attempts to update the row in Achievements table that matched the ID with the given changes
 * @param {number} ID
 * @param {Object} changes contains the achievements's info to be changed
 * @param {string} [achievement.Name] new Achievement's name stored in a string
 * @returns {Promise} promise that resolves to a count of # of rows updated
 */
// const update = (ID, changes) => {
//   return db('Achievements').where({ ID }).update(changes);
// };

/**
 * Attempts to delete row in Achievements table with matching ID
 * @param {number} ID ID of the Achievement to delete
 * @returns {Promise} promise that resolves to a count of # of rows deleted
 */
// const remove = (ID) => {
//   return db('Achievements').where({ ID }).del();
// };

module.exports = {
    add,
};
// module.exports = {
//   getAll,
//   getById,
//   add,
//   update,
//   remove,
// };