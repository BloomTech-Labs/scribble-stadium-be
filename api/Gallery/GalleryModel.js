const db = require("../../data/db-config")



/**
 * A method to retrieve all items from the gallery database
 * @returns {Promise} A promise that resolves to an array of all gallery items
 */
const getAll = () => {
    return db("Gallary")
}

/**
 * A method to retrieve a gallery item object by its ID
 * @param {*} ID The item id pulled from the request params
 * @returns {Promise} A promise that resolves to a gallery object
 */
const getById = (ID) => {
    return db("Gallary as G").where('G.ID', ID).select("G.ID", "G.WritingUrl", "G.PageNum", "G.DrawingUrl")
}

/**
 * A method to submit to gallery
 * @param {*} sub Submission to be added to gallery
 * @returns {Integer} ID of new gallery submission
 */
const add = (sub) => {
    return db('Gallary').insert(sub).returning('ID')
}

module.exports = {
    getAll,
    getById,
    add
}