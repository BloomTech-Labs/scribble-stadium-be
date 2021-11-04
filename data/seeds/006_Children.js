const faker = require('faker');

// so much to check in db....
const children1 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()} (Cohort1)`,
  PIN: `0000`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`, // 1, 2, 3,
  AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
  CohortID: 1,
  IsDyslexic: `${faker.datatype.boolean()}`,
  // Wins: `${faker.datatype.number({min:1, max: 10})}`,
  // Losses: `${faker.datatype.number({min:1, max: 10})}`,
  // Attempting to have wins & losses combine to equal 4 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
  Wins: `${idx % 5}`, // 0,1,2,3,4,0
  Losses: `${(99 - idx) % 5}`, // 4,3,2,1,0,4
  Total_Points: `${faker.datatype.number({ min: 0, max: 400 }) * 4}`,
  Email: `${faker.internet.email()}`,
  // Working with what we have. Other data generators were no better.
  CharacterName: `${faker.hacker
    .adjective()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
    .type()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())}`,
}));

const children2 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()} (Cohort2)`,
  PIN: `0000`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`,
  AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
  CohortID: 2,
  IsDyslexic: `${faker.datatype.boolean()}`,
  // Wins: `${faker.datatype.number({min:1, max: 10})}`,
  // Losses: `${faker.datatype.number({min:1, max: 10})}`,
  // Attempting to have wins & losses combine to equal 3 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
  Wins: `${idx % 4}`, // 0,1,2,3,4,0
  Losses: `${(99 - idx) % 4}`, // 4,3,2,1,0,4
  Total_Points: `${faker.datatype.number({ min: 0, max: 400 }) * 3}`,
  Email: `${faker.internet.email()}`,
  CharacterName: `${faker.hacker
    .adjective()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
    .type()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())}`,
}));

const children3 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()} (Cohort3)`,
  PIN: `0000`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`,
  AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
  CohortID: 3,
  IsDyslexic: `${faker.datatype.boolean()}`,
  // Wins: `${faker.datatype.number({min:1, max: 10})}`,
  // Losses: `${faker.datatype.number({min:1, max: 10})}`,
  // Attempting to have wins & losses combine to equal 1 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
  Wins: `${idx % 2}`, // 0,1,2,3,4,0
  Losses: `${(99 - idx) % 2}`, // 4,3,2,1,0,4
  Total_Points: `${faker.datatype.number({ min: 0, max: 400 }) * 1}`,
  Email: `${faker.internet.email()}`,
  CharacterName: `${faker.hacker
    .adjective()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
    .type()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())}`,
}));

const children4 = [...new Array(8)].map((i, idx) => ({
  Name: `${faker.name.firstName()} (Cohort4)`,
  PIN: `0000`,
  // ParentID: `${Math.floor((idx + 4) / 4)}`,
  ParentID: `${(idx % 4) + 1}`,
  AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
  GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
  CohortID: 4,
  IsDyslexic: `${faker.datatype.boolean()}`,
  // Wins & losses combine to equal 0, bc it's cohort 4's first time playing.
  Wins: `0`,
  Losses: `0`,
  Total_Points: 0,
  Email: `${faker.internet.email()}`,
  CharacterName: `${faker.hacker
    .adjective()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
    .type()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())}`,
}));

const children = children1.concat(children2, children3, children4);

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Children').insert(children)
  .then(function(){
    return knex('Children').insert([
      { Name: `${faker.name.lastName("McVirtual")} (Cohort3)`,
      PIN: `0000`,
      // ParentID: `${Math.floor((idx + 4) / 4)}`,
      ParentID: 5,
      AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
      GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
      CohortID: 3,
      IsDyslexic: `${faker.datatype.boolean()}`,
      // Wins: `${faker.datatype.number({min:1, max: 10})}`,
      // Losses: `${faker.datatype.number({min:1, max: 10})}`,
      // Attempting to have wins & losses combine to equal 1 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
     // Wins: `${idx % 2}`, // 0,1,2,3,4,0
      //Losses: `${(99 - idx) % 2}`, // 4,3,2,1,0,4
      Total_Points: `${faker.datatype.number({ min: 0, max: 400 }) * 1}`,
      Email: `${faker.internet.email()}`,
      CharacterName: `${faker.hacker
        .adjective()
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
        .type()
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())}`,},
      { Name: `${faker.name.lastName("McVirtual")} (Cohort3)`,
      PIN: `0000`,
      // ParentID: `${Math.floor((idx + 4) / 4)}`,
      ParentID: 5,
      AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
      GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
      CohortID: 3,
      IsDyslexic: `${faker.datatype.boolean()}`,
      // Wins: `${faker.datatype.number({min:1, max: 10})}`,
      // Losses: `${faker.datatype.number({min:1, max: 10})}`,
      // Attempting to have wins & losses combine to equal 1 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
      //Wins: `${idx % 2}`, // 0,1,2,3,4,0
      //Losses: `${(99 - idx) % 2}`, // 4,3,2,1,0,4
      Total_Points: `${faker.datatype.number({ min: 0, max: 400 }) * 1}`,
      Email: `${faker.internet.email()}`,
      CharacterName: `${faker.hacker
        .adjective()
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
        .type()
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())}`,},
      { Name: `${faker.name.lastName("McVirtual")} (Cohort3)`,
      PIN: `0000`,
      // ParentID: `${Math.floor((idx + 4) / 4)}`,
      ParentID: 5,
      AvatarID: `${faker.datatype.number({ min: 1, max: 10 })}`,
      GradeLevelID: `${faker.datatype.number({ min: 1, max: 6 })}`,
      CohortID: 3,
      IsDyslexic: `${faker.datatype.boolean()}`,
      // Wins: `${faker.datatype.number({min:1, max: 10})}`,
      // Losses: `${faker.datatype.number({min:1, max: 10})}`,
      // Attempting to have wins & losses combine to equal 1 (1 less than the cohort's StoryID, which should be how many weeks/rounds they've finished). Check table to see if it works.
      //Wins: `${idx % 2}`, // 0,1,2,3,4,0
     // Losses: `${(99 - idx) % 2}`, // 4,3,2,1,0,4
      Total_Points: `${faker.datatype.number({ min: 0, max: 400 }) * 1}`,
      Email: `${faker.internet.email()}`,
      CharacterName: `${faker.hacker
        .adjective()
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())} ${faker.animal
        .type()
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase())}`,}
    ])
  
  
})
}
