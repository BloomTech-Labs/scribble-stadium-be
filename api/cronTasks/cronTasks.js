const db = require('../../data/db-config');

// Winners are declared.
// Based on majority of votes the submission gets
// Make two columns of integers (Wins & Loses)
// Make a query

// Migration file: change Winner to the Id of the child that won

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

const getWinner = () => {
    return db('Faceoffs').join()
};


module.exports = {
    getAll,
    getById,
    add,
    update
}