const db = require('../../data/db-config');


const getAll = () => {
    return db('Faceoffs');
};

const getById = ID => {
    return db('Faceoffs').where({ ID }).first();
}

const add = faceoff => {
    return db('Faceoffs').insert({...faceoff});
};

const update = (ID, changes) => {
    return db('Faceoffs').where({ ID }).update(changes);
};

const remove = ID => {
    return db('Faceoffs').where({ ID }).del();
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}