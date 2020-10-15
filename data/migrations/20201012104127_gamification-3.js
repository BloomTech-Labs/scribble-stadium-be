exports.up = function (knex) {
  return knex.schema
    .createTable('Faceoffs', (t) => {
      t.increments('ID');
      t.integer('Points').notNullable();
      t.enu('Winner', [1, 2], {
        useNative: true,
        enumName: 'vote',
      });
      t.enu('Type', ['WRITING', 'DRAWING'], {
        useNative: true,
        enumName: 'subtype',
      });
      t.integer('SubmissionID1')
        .notNullable()
        .unsigned()
        .references('Submissions.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('SubmissionID2')
        .notNullable()
        .unsigned()
        .references('Submissions.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('SquadID')
        .notNullable()
        .unsigned()
        .references('Squads.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })
    .createTable('Votes', (t) => {
      t.increments('ID');
      t.enu('Vote', null, {
        useNative: true,
        enumName: 'vote',
        existingType: true,
      });
      t.integer('MemberID')
        .notNullable()
        .unsigned()
        .references('Members.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      t.integer('FaceoffID')
        .notNullable()
        .unsigned()
        .references('Faceoffs.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Votes')
    .dropTableIfExists('Faceoffs')
    .raw('DROP TYPE vote')
    .raw('DROP TYPE subtype');
};
