const db = require('../../data/db-config');


/**
 * Adds a BOT to the database
 * @param {Object} botdata contains the bot's info
 * @param {string} bot.Name name stored in a string
 * @returns {Promise} promise that resolves to ID of new bot or an error message
 */
const add = (botdata) => {
    return db('Singleplayer')
        .insert({
            ...botdata,
        })
        .returning('ID');
};


module.exports = {
    add,
};