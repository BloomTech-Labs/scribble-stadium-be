exports.up = function(knex) {
    return knex.schema.table('Gallary', table => {
        table.dateTime("timestamp")
    })
  };

exports.down = function(knex) {
    return knex.schema.table("Gallary", table => {
      table.dropColumn("timestamp")
    });
};
