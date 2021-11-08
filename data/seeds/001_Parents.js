const faker = require('faker');

const parents = ['Alice', 'Barbara', 'Christopher', 'David'].map(
  (parentName, idx) => ({
    Name: parentName,
    PIN: '0000',
    Email: `llama00${idx + 1}@maildrop.cc`,
  })
);


exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Parents').insert(parents)
  .then(function(){
    return knex('Parents').insert([
      {ID:5,
       Name:`${faker.name.firstName()}  "McVirtual"`,
       PIN:"0000",
       Email:`${faker.internet.email()}`},
      
    ])
  })
   
};
