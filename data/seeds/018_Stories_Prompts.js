exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Story-Prompts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Story-Prompts').insert([
        {
          id: 1,
          EpisodeID: '1',
          Type: 'Writing',
          Prompt:
            "Imagine and write down a scene from Finn's Little League tryouts.(In case you're wondering, Flipperball is a lot like soccer, and your job is to imagine how Finn performed as the coaches looked on.)",
        },
        {
          id: 2,
          EpisodeID: '1',
          Type: 'Drawing',
          Prompt:
            'Draw one scene from chapters 1-2. For a caption to your picture, write out the sentence from the main story where your picture should appear',
        },
        {
          id: 3,
          EpisodeID: '2',
          Type: 'Writing',
          Prompt:
            'Where would Finn to visit first while wearing his new jersey?',
        },
        {
          id: 4,
          EpisodeID: '2',
          Type: 'Drawing',
          Prompt:
            'Where would Finn to visit first while wearing his new jersey?',
        },
        {
          id: 5,
          EpisodeID: '3',
          Type: 'Writing',
          Prompt: 'What did Gilbert do last year to become team captain?',
        },
        {
          id: 6,
          EpisodeID: '3',
          Type: 'Drawing',
          Prompt: 'What did Gilbert do last year to become team captain?',
        },
        {
          id: 7,
          EpisodeID: '4',
          Type: 'Writing',
          Prompt:
            "Finn and Gilbert's mom was a secret spy. What was her last adventure?",
        },
        {
          id: 8,
          EpisodeID: '4',
          Type: 'Drawing',
          Prompt:
            "Finn and Gilbert's mom was a secret spy. What was her last adventure?",
        },
        {
          id: 9,
          EpisodeID: '5',
          Type: 'Writing',
          Prompt:
            'What went wrong with Finn got his tooth ready for the toothfairy?',
        },
        {
          id: 10,
          EpisodeID: '5',
          Type: 'Drawing',
          Prompt:
            'What went wrong with Finn got his tooth ready for the toothfairy?',
        },
        {
          id: 11,
          EpisodeID: '6',
          Type: 'Writing',
          Prompt:
            'Finn and Gilbert decide to make the biggest sandwich possible. What happened next?',
        },
        {
          id: 12,
          EpisodeID: '6',
          Type: 'Drawing',
          Prompt:
            'Finn and Gilbert decide to make the biggest sandwich possible. What happened next?',
        },
        {
          id: 13,
          EpisodeID: '7',
          Type: 'Writing',
          Prompt:
            'Gilbert tried to eat an octopus. How did it not go as planned?',
        },
        {
          id: 14,
          EpisodeID: '7',
          Type: 'Drawing',
          Prompt:
            'Gilbert tried to eat an octopus. How did it not go as planned?',
        },
        {
          id: 15,
          EpisodeID: '8',
          Type: 'Writing',
          Prompt:
            "What does Finn do now that he's the official equipment manager?",
        },
        {
          id: 16,
          EpisodeID: '8',
          Type: 'Drawing',
          Prompt:
            "What does Finn do now that he's the official equipment manager?",
        },
        {
          id: 17,
          EpisodeID: '9',
          Type: 'Writing',
          Prompt: "Shopping to 'put on mass', what does Finn buy?",
        },
        {
          id: 18,
          EpisodeID: '9',
          Type: 'Drawing',
          Prompt: "Shopping to 'put on mass', what does Finn buy?",
        },
        {
          id: 19,
          EpisodeID: '10',
          Type: 'Writing',
          Prompt: 'What would have made a crazier ending?',
        },
        {
          id: 20,
          EpisodeID: '10',
          Type: 'Drawing',
          Prompt: 'What would have made a crazier ending?',
        },
      ]);
    });
};
