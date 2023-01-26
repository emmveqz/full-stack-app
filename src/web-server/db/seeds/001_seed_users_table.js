exports.seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users")
        .insert([
          {
            id: 1,
            name: "First User",
            email: "firstuser@email.com",
          },
        ]);
    });
};