exports.up = function(knex) {
  return knex.schema
    .createTable("project", tbl => {
      tbl.increments();
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.text("description").notNullable();
      tbl
        .boolean("completed")
        .defaultTo(false)
        .notNullable();
    })
    .createTable("task", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .references("project.id")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("description").notNullable();
      tbl.text("notes");
      tbl
        .boolean("completed")
        .defaultTo(false)
        .notNullable();
    })
    .createTable("resource", tbl => {
      tbl.increments();
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.text("description").notNullable();
    })
    .createTable("project_resource", tbl => {
      tbl.increments();
      tbl
        .integer("resource_id")
        .notNullable()
        .references("resource.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("project_id")
        .notNullable()
        .references("project.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resource")
    .dropTableIfExists("resource")
    .dropTableIfExists("task")
    .dropTableIfExists("project");
};
