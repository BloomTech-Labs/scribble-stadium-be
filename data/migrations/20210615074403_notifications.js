exports.up = function (knex) {
  return knex.schema
    .createTable('Parent-Notifications', (parentNotifications) => {
      parentNotifications.integer('ParentID')
        .notNullable()
        .references('Parents.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      parentNotifications.string('Notification').notNullable();
      parentNotifications.boolean('Read').notNullable().defaultTo(false);
      parentNotifications.string('Type').notNullable().defaultTo('information');
      parentNotifications.timestamp('Date').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('Child-Notifications', (childNotifications) => {
      childNotifications.integer('ChildID')
        .notNullable()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      childNotifications.string('Notification').notNullable();
      childNotifications.boolean('Read').notNullable().defaultTo(false);
      childNotifications.string('Type').notNullable().defaultTo('information')
      childNotifications.timestamp('Date').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Parent-Notifications')
    .dropTableIfExists('Child-Notifications');
};