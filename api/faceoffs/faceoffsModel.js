const db = require('../../data/db-config');


const getAll = () => {
    return db('faceoffs');
};

const getById = ID => {
    return db('faceoffs').where({ ID }).first();
}

const add = faceoff => {
    return db('faceoffs').insert({...faceoff})
};

const update = (ID, changes) => {
    return db('faceoffs').where({ ID }).update(changes);
};

const remove = ID => {
    return db('faceoffs').where({ ID }).del();
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}