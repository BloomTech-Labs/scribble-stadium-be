const faker = require('faker');
const dummyPDF = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;

const stories = [...new Array(10)].map(() => ({
  Title: `${faker.name.title()}`,
  URL: `${dummyPDF}`,
  WritingPrompt: `${faker.lorem.sentences(2)}`,
  DrawingPrompt: `${faker.lorem.sentences(2)}`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Stories').then(function () {
    // Inserts seed entries
    return knex('Stories').insert(stories);
  });
};
