const db = require('../../data/db-config')

const getAll = () => {
    return db('Stories')
}

const getById = (id) => {
    return db('Stories')
}