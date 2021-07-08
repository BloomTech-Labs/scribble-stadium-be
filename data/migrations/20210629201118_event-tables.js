exports.up = function (knex) {
  return knex.schema
    .createTable('Staff', (staff) => {
      staff.increments('ID');
      staff.string('Name').notNullable();
      staff.string('Email').notNullable();
      staff.string('PIN').notNullable();
    })
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
    })
    .createTable('Staff-Events', (staffEvents) => {
      staffEvents
        .integer('StaffID')
        .notNullable()
        .references('Staff.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      staffEvents
        .integer('EventID')
        .notNullable()
        .references('Events.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      staffEvents.boolean('Enabled').notNullable().defaultTo(true);
      staffEvents.boolean('Completed').notNullable().defaultTo(false);
    })
    // .raw(`CREATE UNIQUE INDEX "UniqueIndex" ON "Children-Events" ("ChildID", "EventID")`);
    .raw(`ALTER TABLE "Children-Events" ADD CONSTRAINT "ChildID-EventID" UNIQUE ("ChildID", "EventID");`)
    .raw(`ALTER TABLE "Staff-Events" ADD CONSTRAINT "StaffID-EventID" UNIQUE ("StaffID", "EventID");`)
    .raw(`ALTER TABLE "Parents-Events" ADD CONSTRAINT "ParentID-EventID" UNIQUE ("ParentID", "EventID");`);
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Staff-Events')
    .dropTableIfExists('Parents-Events')
    .dropTableIfExists('Children-Events')
    .dropTableIfExists('Events')
    .dropTableIfExists('Staff');
};
