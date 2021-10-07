exports.up = function (knex) {
    return knex.schema
      .createTable('NewSubmissions', (t) => {
        t.increments('ID');
        t.integer('ChildID')
            .notNullable()
            .unsigned()
            .references('Children.ID')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        t.integer('StoryID')
            .notNullable()
            .unsigned()
            .references('Stories.ID')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        t.date('EpisodeStartDate')
            .notNullable()
            .unsigned();
        t.string('ModerationStatus');

        t.boolean('HasRead').defaultTo(false);
        t.boolean('HasWritten').defaultTo(false);
        t.boolean('HasDrawn').defaultTo(false);
        
        t.integer('Complexity');
        t.boolean('LowConfidence').defaultTo(false);
        t.timestamp('CreatedAt').defaultTo(knex.fn.now());
        t.timestamp('UpdatedAt').defaultTo(knex.fn.now());
      })
    //   .createTable('Writing', (t) => {
    //     t.increments('ID');
    //     t.string('URL').notNullable().unique();
    //     t.integer('PageNum').notNullable();
    //     t.integer('SubmissionID')
    //       .notNullable()
    //       .unsigned()
    //       .references('Submissions.ID')
    //       .onUpdate('CASCADE')
    //       .onDelete('RESTRICT');
    //     t.unique(['PageNum', 'SubmissionID']);
    //   })
    //   .createTable('Drawing', (t) => {
    //     t.increments('ID');
    //     t.string('URL').notNullable().unique();
    //     t.integer('SubmissionID')
    //       .notNullable()
    //       .unsigned()
    //       .unique()
    //       .references('Submissions.ID')
    //       .onUpdate('CASCADE')
    //       .onDelete('RESTRICT');
    //   });
  };
  
  exports.down = function (knex) {
    return knex.schema
    //   .dropTableIfExists('Drawing')
    //   .dropTableIfExists('Writing')
      .dropTableIfExists('NewSubmissions');
  };
  