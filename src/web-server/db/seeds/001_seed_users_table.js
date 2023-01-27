exports.seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users")
        .insert([
          {
            name: "First User",
            email: "firstuser@email.com",
          },
        ]);
    });
};