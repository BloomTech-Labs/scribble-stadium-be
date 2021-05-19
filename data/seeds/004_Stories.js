const faker = require('faker');

// These are not story submissions, but the story that every student is reading and then prompted to base their own drawings & writings off of.
// const stories = [...new Array(10)].map(() => ({
//   Title: `${faker.lorem.words(3)}`,
//   URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
//   WritingPrompt: `${faker.lorem.sentences(2)}`,
//   DrawingPrompt: `${faker.lorem.sentences(2)}`,
// }));

// The first story object here was provided by the stakeholder. The rest are not accurate depictions, but placeholders to test app functionality.
const stories = [
  {
    Title: 'Zoom & Boom (Week1, Chapters 1 & 2)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      ': Imagine and write down a scene from Finn’s Little League tryouts. (In case you’re wondering, flipperball is a lot like soccer, and your job is to imagine how Finn performed as the coaches looked on.)',
    DrawingPrompt:
      'draw one scene from Chapters 1-2. For a caption to your picture, write out the sentence from the main story where your picture should appear.',
  },
  {
    Title: 'Zoom & Boom (Week2, Chapters 3 & 4)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      'Where would Finn to visit first while wearing his new jersey',
    DrawingPrompt:
      'Where would Finn to visit first while wearing his new jersey',
  },
  {
    Title: 'Zoom & Boom (Week3, Chapters 5 & 6)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt: 'What did Gilbert do last year to become team captain',
    DrawingPrompt: 'What did Gilbert do last year to become team captain',
  },
  {
    Title: 'Zoom & Boom (Week4, Chapters 7 & 8)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      'Finn and Gilberts mom was a secret spy. What was her last adventure?',
    DrawingPrompt:
      'Finn and Gilberts mom was a secret spy. What was her last adventure?',
  },
  {
    Title: 'Zoom & Boom (Week5, Chapters 9 & 10)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      'What went wrong when Finn got his tooth ready for the toothfairy?',
    DrawingPrompt:
      'What went wrong when Finn got his tooth ready for the toothfairy?',
  },
  {
    Title: 'Zoom & Boom (Week6, Chapters 11 & 12)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      'Finn and Gilbert decide to make the biggest sandwhich possible. What happened next?',
    DrawingPrompt:
      'Finn and Gilbert decide to make the biggest sandwhich possible. What happened next?',
  },
  {
    Title: 'Zoom & Boom (Week7, Chapters 13 & 14)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      'Gilbert tried to eat an octopus. How did it not go as planned?',
    DrawingPrompt:
      'Gilbert tried to eat an octopus. How did it not go as planned?',
  },
  {
    Title: 'Zoom & Boom (Week8, Chapters 15 & 16)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt:
      "What does Finn do now that he's the official equipment manager?",
    DrawingPrompt:
      "What does Finn do now that he's the official equipment manager?",
  },
  {
    Title: 'Zoom & Boom (Week9, Chapters 17 & 18)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt: "Shopping to 'put on mass,' what does Finn buy?",
    DrawingPrompt: "Shopping to 'put on mass,' what does Finn buy?",
  },
  {
    Title: 'Zoom & Boom (Week10, Chapters 19 & 20)',
    URL: 'https://test-image-bucket-14579.s3.amazonaws.com/pdf.pdf',
    WritingPrompt: 'What would have made a crazier ending?',
    DrawingPrompt: 'What would have made a crazier ending?',
  },
];

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('Stories').insert(stories);
};
