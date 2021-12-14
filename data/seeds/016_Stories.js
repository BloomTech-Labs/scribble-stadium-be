exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Stories')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Stories').insert([
        {
          ID: 1,
          Title: 'Zoom & Boom',
          Description: 'Fiction',
          Author: 'Scribble-Stadium',
        },
      ]);
    });
};
