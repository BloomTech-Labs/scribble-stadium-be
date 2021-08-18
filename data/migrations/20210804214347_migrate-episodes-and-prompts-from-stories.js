exports.up = function (knex) {
  return knex('Stories')
    .select('*')
    .then((res) => {
      res.forEach(async (ep) => {
        // Create an episode object in the new shape
        const episodeObj = {
          StoryID: '1',
          EpisodeNumber: ep.ID,
          TextURL: ep.URL,
          AudioURL: ep.Audiofile,
        };

        // Insert the new episode into the table and return the ID
        const [epID] = await knex('Episodes')
          .insert(episodeObj)
          .returning('ID');

        // Create a Writing & Drawing Prompt objects
        const prompts = [
          {
            EpisodeID: epID,
            Type: 'Writing',
            Prompt: ep.WritingPrompt,
          },
          {
            EpisodeID: epID,
            Type: 'Drawing',
            Prompt: ep.DrawingPrompt,
          },
        ];

        // Insert each new obj into table
        prompts.forEach(async (prompt) => {
          await knex('Story-Prompts').insert(prompt);
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.down = async function (knex) {
  await knex.raw('TRUNCATE TABLE "Episodes" RESTART IDENTITY CASCADE');
  return knex.raw('TRUNCATE TABLE "Story-Prompts" RESTART IDENTITY CASCADE');
};
