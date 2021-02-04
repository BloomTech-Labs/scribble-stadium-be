const faker = require('faker');
const bc = require('bcryptjs');

// const parents = [...new Array(4)].map((i, idx) => ({
//   Name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//   PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
//   Email: `llama00${idx + 1}@maildrop.cc`,
// }));

// This seed data is hardcoded from above faker-generated data.
// ? Is there a reason the PIN's are so long?
const parents = [
  {
    Name: "Gustave Hickle",
    PIN: "$2a$06$R38Pn.ck0j9gMhu3BAGO2eEB.VgRlnRcbNZO1MlgbasT2mJxORH1G",
    Email: "llama001@maildrop.cc",
  },
  {
    Name: "Dillan Harris",
    PIN: "$2a$06$QDwCpOavzUsfMQp7KDKrF.CJ8ftt.NXn0z7zF6wrrOMboMo1zR.O2",
    Email: "llama002@maildrop.cc",
  },
  {
    Name: "Winnifred Jakubowski",
    PIN: "$2a$06$BMawnGS99QJ.3TgoJDacO.OE8pgK66LbLQYDkOWalTiUQkq827.y2",
    Email: "llama003@maildrop.cc",
  },
  {
    Name: "Dovie Beier",
    PIN: "$2a$06$7yVnnkXzJzyYcU9LC6duA.3fsZJrdLV6dSGVjARmHKIElC9LLjQ/m",
    Email: "llama004@maildrop.cc",
  },
];

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Parents').insert(parents);
};
