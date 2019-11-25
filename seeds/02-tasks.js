exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("task")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("task").insert([
        {
          project_id: 1,
          description:
            "Create package.json file and install relevant dependencies."
        },
        {
          project_id: 1,
          description: "Create rest of app scaffolding.",
          notes:
            "Must include migration files, seed files, config files and router files."
        },
        {
          project_id: 2,
          description:
            "Complete all projects with no less than a 2 star rating."
        },
        {
          project_id: 2,
          description:
            "Work with team members to produce an awe-inspiring LABS project."
        }
      ]);
    });
};
