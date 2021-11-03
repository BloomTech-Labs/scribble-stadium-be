
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('VirtualChild').del()
    .then(function () {
      // Inserts seed entries
      return knex('VirtualChild').insert([
        {id: 1, email: '', first_name:"Mike",last_name:"McVirtual"},
        {id: 2, email: '', first_name:"Sara",last_name:"McVirtual"},
        {id: 3, email: '', first_name:"Jamie",last_name:"McVirtual"}
      ]);
    });
};
