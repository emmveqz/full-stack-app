
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable("users");
};
