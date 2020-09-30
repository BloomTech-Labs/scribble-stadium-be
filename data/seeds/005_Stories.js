const faker = require('faker');

const stories = [...new Array(10)].map(() => ({
  Title: `${faker.lorem.words(3)}`,
  URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
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
