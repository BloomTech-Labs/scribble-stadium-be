const db = require('../../data/db-config');


const getAll = () => {
    return db('Faceoffs');
};

const getById = ID => {
    return db('Faceoffs').where({ ID });
}

const add = faceoff => {
    return db('Faceoffs').insert({...faceoff}).returning('ID');
};

const update = (ID, changes) => {
    return db('Faceoffs').where({ ID }).update(changes);
};


module.exports = {
    getAll,
    getById,
    add,
    update
}