exports.up = function (knex) {
  return knex.schema.alterTable('Submissions', (t) => {
    t.renameColumn('id', 'ID');
    t.renameColumn('childId', 'ChildID');
    t.renameColumn('storyId', 'StoryID');
    t.renameColumn('episodeId', 'EpisodeID');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('Submissions', (t) => {
    t.renameColumn('ID', 'id');
    t.renameColumn('ChildID', 'childId');
    t.renameColumn('StoryID', 'storyId');
    t.renameColumn('EpisodeID', 'episodeId');
  });
};
