exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("project")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("project").insert([
        {
          name: "Create an API",
          description:
            "Using your programming skills, create a viable backend to return queried information on specified endpoints."
        },
        {
          name: "Graduate Lambda Summa Cum Laude",
          description:
            "Because of your awesome skills, be one of the top 10% of the graduating class."
        }
      ]);
    });
};
