const faceoffs = [

];

exports.seed = knex => {
    return knex('Faceoffs').insert(faceoffs);
}