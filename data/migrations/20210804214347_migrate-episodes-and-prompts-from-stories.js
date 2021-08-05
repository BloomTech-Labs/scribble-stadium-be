exports.up = function (knex) {
  knex('Stories')
    .select('*')
    .then((res) => {
      res.forEach(async (ep) => {
        const EpisodeObj = {
          StoryID: '1',
          EpisodeNumber: ep.ID,
          TextURL: ep.URL,
          AudioURL: ep.Audiofile,
        };
        console.log(EpisodeObj);
        await knex('Episodes').insert(EpisodeObj);
      });
    });
};

exports.down = function (knex) {};
