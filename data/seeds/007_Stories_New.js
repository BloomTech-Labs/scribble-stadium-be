exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Stories-New')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Stories-New').insert([
        {
          ID: 1,
          Title: 'Zoom & Boom',
          Description: 'Fiction',
          Author: 'Scribble-Stadium',
        },
      ]);
    });
};
