
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('Events').insert([
        {
          ID: 1,
          Name: 'Read',
          OpenDayOfWeek: 6,
          OpenHour: 9,
          CloseDayOfWeek: 5,
          CloseHour: 9,
        },
      ]);
    });
};
