exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Events')
    .del()
    .then(function () {
      return knex('Events').insert([
        {
          ID: 1,
          Name: 'Read',
          OpenDayOfWeek: 6, //6=Sat
          OpenHour: 9,
          CloseDayOfWeek: 5, //5=Fri
          CloseHour: 9,
        },
        {
          ID: 2,
          Name: 'Draw',
          OpenDayOfWeek: 1, //1=Mon
          OpenHour: 9,
          CloseDayOfWeek: 3, //3=Wed
          CloseHour: 9,
        },
        {
          ID: 3,
          Name: 'Write',
          OpenDayOfWeek: 2, //2=Tues
          OpenHour: 9,
          CloseDayOfWeek: 3, //3=Wed
          CloseHour: 9,
        },
        {
          ID: 4,
          Name: 'StaffReview',
          OpenDayOfWeek: 3, //3=Wed
          OpenHour: 9,
          CloseDayOfWeek: 4, //4=Thr
          CloseHour: 9,
        },
        {
          ID: 5,
          Name: 'PointShare',
          OpenDayOfWeek: 4,
          OpenHour: 9,
          CloseDayOfWeek: 5,
          CloseHour: 9,
        },
        {
          ID: 6,
          Name: 'Vote',
          OpenDayOfWeek: 5,
          OpenHour: 9,
          CloseDayOfWeek: 6,
          CloseHour: 9,
        },
      ]);
    });
};
