
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('VirtualParent').del()
    .then(function () {
      // Inserts seed entries
      return knex('VirtualParent').insert([
        {id: 1, email: '', first_name:"Anne",last_name:"McVirtual"},
        {id: 2, email: '', first_name:"Randy",last_name:"McVirtual"},
        {id: 3, email: '', first_name:"Bob",last_name:"McVirtual"}
      ]);
    });
};
