exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resource")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resource").insert([
        { name: "Laptop", description: "A coder's primary tool." },
        {
          name: "Coding Skill",
          description:
            "The ability to code in multiple coding languages and environments."
        },
        {
          name: "VS Code",
          description: "A very versatile IDE for developers"
        },
        {
          name: "Portfolio",
          description: "Show off what you got!"
        }
      ]);
    });
};
