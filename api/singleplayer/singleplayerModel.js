import db from '../../data/db-config';

/**
 * Adds a bot to the database
 * @param {Object} botdata contains the botdata's info
 * @param {string} botdata.Name name stored in a string
 * @returns {Promise} promise that resolves to ID of new botdata or an error message
 */
const add = (botdata) => {
    return db('Singleplayer')
        .insert({
            ...botdata,
        })
        .returning('ID');
};

export default {
    add,
};