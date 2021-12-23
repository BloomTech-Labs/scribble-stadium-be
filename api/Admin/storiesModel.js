const db = require('../../data/db-config')
// returns all 
const getAll = () => {
    return db('Stories')
}

const getById = (id) => {
    return db('Stories')
    .where({id})

    
}


module.exports = {
    getAll,
    getById
}