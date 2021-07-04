exports.up = function (knex) {
  return knex.schema
    .createTable('Events', (events) => {
      events.increments('ID');
      events.string('Name').notNullable();
      events.string('Open');
      events.string('Close');
    })
    .createTable('Children-Events', (childrenEvents) => {
      childrenEvents
        .integer('ChildID')
        .notNullable()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      childrenEvents
        .integer('EventID')
        .notNullable()
        .references('Events.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      childrenEvents.boolean('Enabled').notNullable().defaultTo(true);
      childrenEvents.boolean('Completed').notNullable().defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Parents-Events')
    .dropTableIfExists('Children-Events')
    .dropTableIfExists('Events');
};
