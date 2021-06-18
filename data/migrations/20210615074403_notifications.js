exports.up = function (knex) {
  return knex.schema
    .createTable('Notifications', (notifications) => {
      notifications.increments('ID');
      notifications.string('Text').notNullable();
      //The notification "Type" will be used to style the notification on the front-end
      //possible/example Types: information, warning, goodnews
      notifications.string('Type').notNullable().defaultTo('information');
      //"LinksTo" could be a string indicating where the user will be directed when they click on the notification
      notifications.string('LinksTo');
      notifications.timestamp('Date').notNullable().defaultTo(knex.fn.now());
      notifications.timestamp('DueDate');
    })
    .createTable('Children-Notifications', (childrenNotifications) => {
      childrenNotifications
        .integer('ChildID')
        .notNullable()
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      childrenNotifications
        .integer('NotificationID')
        .notNullable()
        .references('Notifications.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      childrenNotifications.boolean('Read').notNullable().defaultTo(false);
    })
    .createTable('Parents-Notifications', (parentsNotifications) => {
      parentsNotifications
        .integer('ParentID')
        .notNullable()
        .references('Parents.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      parentsNotifications
        .integer('ChildID')
        .references('Children.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      parentsNotifications
        .integer('NotificationID')
        .notNullable()
        .references('Notifications.ID')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      parentsNotifications.boolean('Read').notNullable().defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Notifications')
    .dropTableIfExists('Children-Notifications')
    .dropTableIfExists('Parents-Notifications');
};
