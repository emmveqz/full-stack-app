
exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("merchant_id", 255).nullable();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable("users");
};
