
exports.up = function(knex) {
  return knex.schema.table('Gallary', table => {
      table.integer("children_id").unsigned().notNull().references("ID").inTable("Children").onUpdate("CASCADE").onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.dropColumn("children_id")
};
