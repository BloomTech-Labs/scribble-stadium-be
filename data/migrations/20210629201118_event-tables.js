exports.up = function (knex) {
  return knex.schema
    .createTable('Events', (events) => {
      events.increments('ID');
      events.string('Name').notNullable();
      //format for entering dates/times for event open/close is based on node-cron's expected input values. null values here will/should be replaced with * in nodeCron
      //also important, Hour values are based on 24h clock
      events.integer('OpenDayOfWeek');
      events.integer('OpenDayOfMonth');
      events.integer('OpenHour');
      events.integer('OpenMinute');
      events.integer('CloseDayOfWeek');
      events.integer('CloseDayOfMonth');
      events.integer('CloseHour');
      events.integer('CloseMinute');
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
    })
    .createTable('Parents-Events', (parentsEvents) => {
      parentsEvents
        .integer('ParentID')
        .notNullable()
        .references('Parents.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      parentsEvents
        .integer('EventID')
        .notNullable()
        .references('Events.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      parentsEvents.boolean('Enabled').notNullable().defaultTo(true);
      parentsEvents.boolean('Completed').notNullable().defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Parents-Events')
    .dropTableIfExists('Children-Events')
    .dropTableIfExists('Events');
};
