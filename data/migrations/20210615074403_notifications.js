exports.up = function (knex) {
  return knex.schema
    .createTable('Parent-Notifications', (parentNotifications) => {
      parentNotifications.increments('ID');
      parentNotifications.integer('ParentID')
        .notNullable()
        .references('Parents.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      parentNotifications.string('Notification').notNullable();
      parentNotifications.boolean('Read').notNullable().defaultTo(false);
      //The notification "Type" will be used to style the notification on the front-end
      //possible/example Types: information, warning, goodnews
      parentNotifications.string('Type').notNullable().defaultTo('information');
      //"LinksTo" could be a string indicating where the user will be directed when they click on the notification
      parentNotifications.string('LinksTo').notNullable();
      parentNotifications.timestamp('Date').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('Child-Notifications', (childNotifications) => {
      childNotifications.increments('ID');
      childNotifications.integer('ChildID')
        .notNullable()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      childNotifications.string('Notification').notNullable();
      childNotifications.boolean('Read').notNullable().defaultTo(false);
      childNotifications.string('Type').notNullable().defaultTo('information');
      childNotifications.string('LinksTo').notNullable();
      childNotifications.timestamp('Date').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Parent-Notifications')
    .dropTableIfExists('Child-Notifications');
};