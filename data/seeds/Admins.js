exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Admins')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Admins').insert({
        Email: 'llama002@maildrop.cc',
        Name: 'Jim',
      });
    });
};
