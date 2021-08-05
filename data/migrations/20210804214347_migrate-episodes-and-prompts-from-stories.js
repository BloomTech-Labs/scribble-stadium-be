exports.up = function (knex) {
  knex('Stories')
    .select('*')
    .then(async (res) => {
      //   console.log('this is stories', res);
      for (let i = 0; i < res.length; i++) {
        let EpisodeObj = {
          StoryID: "1",
          EpisodeNumber: res[i].ID,
          TextURL: res[i].URL,
          AudioURL: res[i].Audiofile,
        };
        await knex('Episodes').insert(EpisodeObj);
      }
    });
  knex('Episodes')
    .select('*')
    .then((res) => {
      console.log('this is now episodes', res);
    });
};

exports.down = function (knex) {};
