
exports.up = function(knex) {
    return knex.schema
    .createTable('Gallary', (t)=>{
        t.increments('ID')
        t.string('WritingUrl').notNullable().unique();
        t.integer('PageNum').notNullable();
        t.string('DrawingUrl').notNullable().unique();
        
    })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Gallary')
  
};
