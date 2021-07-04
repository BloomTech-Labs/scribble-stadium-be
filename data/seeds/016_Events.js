exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Events')
    .del()
    .then(function () {
      return knex('Events').insert([
        {
          ID: 1,
          Name: 'Read',
          Open: '0 9 * * Saturday',
          Close: '0 9 * * Friday',
        },
        {
          ID: 2,
          Name: 'Draw',
          Open: '0 9 * * Monday',
          Close: '0 9 * * Wednesday',
        },
        {
          ID: 3,
          Name: 'Write',
          Open: '0 9 * * Tuesday',
          Close: '0 9 * * Wednesday',
        },
        {
          ID: 4,
          Name: 'StaffReview',
          Open: '0 9 * * Wednesday',
          Close: '0 9 * * Thursday',
        },
        {
          ID: 5,
          Name: 'PointShare',
          Open: '0 9 * * Thursday',
          Close: '0 9 * * Friday',
        },
        {
          ID: 6,
          Name: 'Vote',
          Open: '0 9 * * Friday',
          Close: '0 9 * * Saturday',
        },
      ]);
    });
};
