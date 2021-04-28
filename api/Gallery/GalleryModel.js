const db = require("../../data/db-config")



/**
 * Retrieve all items from the gallery database
 * @returns {Promise} A promise that resolves to an array of all gallery items
 */
const getAll = () => {
    return db("Gallary")
}

/**
 * Retrieves a gallery item object by its ID
 * @param {Integer} ID The item id pulled from the request params
 * @returns {Promise} A promise that resolves to a gallery object
 */
const getById = (ID) => {
    return db("Gallary as G")
        .where('G.ID', ID)
        .select(
            "G.ID",
            "G.WritingUrl",
            "G.PageNum",
            "G.DrawingUrl",
        );
}

/**
 * A method to submit to gallery db
 * @param {Object} sub Submission to be added to gallery
 * @param {Integer} [gallery.ID] new item's ID
 * @param {String} [gallery.WritingUrl] new item's writing submission link, stored as a string
 * @param {Integer} [gallery.PageNum] 
 * @param {String} [gallery.DrawingUrl] new item's drawing submission link, stored as a string
 * @returns {Promise} Promise that returns new item's ID
 */
const add = (sub) => {
    return db('Gallary').insert(sub).returning('ID')
}

/**
 * 
 * @param {Integer} ID ID of item to update  
 * @param {Object} changes Object of changes to gallery item
 * @returns {Promise} Promise that returns no body
 */
const update = (ID, changes) => {
    return db("Gallary").where({ ID }).update(changes)
}

/**
 * Attempts to remove an item from the gallery by its ID 
 * @param {Integer} ID ID of item to be removed
 * @returns {Promise} Promise that returns no body
 */
const remove = (ID) => {
    return db("Gallary").where({ID}).del()
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}