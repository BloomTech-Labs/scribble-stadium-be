const faker = require('faker');
const bc = require('bcryptjs');

// so much to check in db....
// (Cohort1)
const children1 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()}`,
  PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`, // 1, 2, 3,
  AvatarID: `${faker.random.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.random.number({ min: 1, max: 6 })}`,
  CohortID: 1,
  IsDyslexic: `${faker.random.boolean()}`,
  // Wins: `${faker.random.number({min:1, max: 10})}`,
  // Losses: `${faker.random.number({min:1, max: 10})}`,
  // Attempting to have wins & losses combine to equal 4 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
  Wins: `${(idx) % 5}`,        // 0,1,2,3,4,0
  Losses: `${(99 - idx) % 5}`, // 4,3,2,1,0,4
  Total_Points: `${faker.random.number({ min: 0, max: 400 }) * 4}`
}));

// Chort 2
const children2 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()}`,
  PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`,
  AvatarID: `${faker.random.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.random.number({ min: 1, max: 6 })}`,
  CohortID: 2,
  IsDyslexic: `${faker.random.boolean()}`,
  // Wins: `${faker.random.number({min:1, max: 10})}`,
  // Losses: `${faker.random.number({min:1, max: 10})}`,
  // Attempting to have wins & losses combine to equal 3 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
  Wins: `${(idx) % 4}`,        // 0,1,2,3,4,0
  Losses: `${(99 - idx) % 4}`, // 4,3,2,1,0,4
  Total_Points: `${faker.random.number({ min: 0, max: 400 }) * 3}`
}));

// Cohort 3
const children3 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()}`,
  PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`,
  AvatarID: `${faker.random.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.random.number({ min: 1, max: 6 })}`,
  CohortID: 3,
  IsDyslexic: `${faker.random.boolean()}`,
  // Wins: `${faker.random.number({min:1, max: 10})}`,
  // Losses: `${faker.random.number({min:1, max: 10})}`,
  // Attempting to have wins & losses combine to equal 1 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
  Wins: `${(idx) % 2}`,        // 0,1,2,3,4,0
  Losses: `${(99 - idx) % 2}`, // 4,3,2,1,0,4
  Total_Points: `${faker.random.number({ min: 0, max: 400 }) * 1}`
}));

// Cohort 4 = new kid in week 1
const children4 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()}`,
  PIN: `${bc.hashSync(`0000`, process.env.BCRYPT_ROUNDS || 6)}`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`,
  AvatarID: `${faker.random.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.random.number({ min: 1, max: 6 })}`,
  CohortID: 4,
  IsDyslexic: `${faker.random.boolean()}`,
  // Wins & losses combine to equal 0, bc it's cohort 4's first time playing.
  Wins: `0`,
  Losses: `0`,
  Total_Points: 0
}));

const children = children1.concat(children2, children3, children4)

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Children').insert(children);
};
